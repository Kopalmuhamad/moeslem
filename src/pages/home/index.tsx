import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGeolocation from "@/lib/hooks/useGeolocation";
import useReverseGeocoding from "@/lib/hooks/useReverseGeocoding";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { location, error } = useGeolocation();
  const [prayerTimes, setPrayerTimes] = useState<any | null>(null);
  const [dateInfo, setDateInfo] = useState<string>("");

  const locationName = useReverseGeocoding(
    location?.latitude,
    location?.longitude
  );

  const [quran, setQuran] = useState<any[]>([]);

  useEffect(() => {
    if (location) {
      const fetchPrayerTimes = async () => {
        try {
          const url = `https://api.aladhan.com/v1/calendar/2024/7?latitude=${location.latitude}&longitude=${location.longitude}&method=2`;
          const response = await axios.get(url);
          const data = response.data.data;

          const today = new Date();
          const todayDateString = `${String(today.getDate()).padStart(
            2,
            "0"
          )}-${String(today.getMonth() + 1).padStart(
            2,
            "0"
          )}-${today.getFullYear()}`;

          const todayData = data.find(
            (item: any) => item.date.gregorian.date === todayDateString
          );

          if (todayData) {
            setPrayerTimes(todayData.timings);
            setDateInfo(
              `${todayData.date.gregorian.date}, ${todayData.date.gregorian.weekday.en} - ${todayData.date.gregorian.month.en} ${todayData.date.gregorian.year}`
            );
          } else {
            console.error("Jadwal sholat untuk hari ini tidak ditemukan.");
          }
        } catch (error) {
          console.error("Error fetching prayer times:", error);
        }
      };

      fetchPrayerTimes();
    }
  }, [location]);

  const fetchQuran = async () => {
    try {
      const response = await axios.get("https://equran.id/api/v2/surat");
      const data = response.data.data;
      setQuran(data);
    } catch (error) {
      console.error("Error fetching Quran:", error);
    }
  };

  useEffect(() => {
    fetchQuran();
  }, []);

  return (
    <MainLayout>
      <div
        className="bg-[url('/assets/mosque.jpg')] bg-cover bg-no-repeat bg-bottom min-w-full min-h-full"
        style={{ boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.5)" }}
      >
        <div className="container mx-auto min-h-[60vh] sm:min-h-screen pt-[78px] flex items-center justify-center text-center flex-col gap-4">
          <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white drop-shadow-3xl">
            Being a devout Muslim means making the Quran and Sunnah the guide to
            life, and striving to spread mercy and compassion on earth.
          </h1>
          <Button className="py-2 px-4 sm:py-4 sm:px-6 md:py-6 md:px-8 text-base md:text-lg">
            Be Better
          </Button>
        </div>
      </div>
      <div className="container mx-auto h-full py-8 flex flex-col items-start justify-start">
        <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
          Jadwal sholat
        </h1>
        <p className="text-sm sm:text-lg md:text-xl font-medium text-black/70">
          {locationName} · {dateInfo}
        </p>
        {prayerTimes ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-base md:text-lg font-semibold text-black">
                  Subuh
                </TableHead>
                <TableHead className="text-base md:text-lg font-semibold text-black">
                  Dhuha
                </TableHead>
                <TableHead className="text-base md:text-lg font-semibold text-black">
                  Dzuhur
                </TableHead>
                <TableHead className="text-base md:text-lg font-semibold text-black">
                  Ashar
                </TableHead>
                <TableHead className="text-base md:text-lg font-semibold text-black">
                  Maghrib
                </TableHead>
                <TableHead className="text-base md:text-lg font-semibold text-black">
                  Isya
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-base md:text-lg font-medium text-black/70">
                  {prayerTimes.Fajr}
                </TableCell>
                <TableCell className="text-base md:text-lg font-medium text-black/70">
                  {prayerTimes.Sunrise}
                </TableCell>
                <TableCell className="text-base md:text-lg font-medium text-black/70">
                  {prayerTimes.Dhuhr}
                </TableCell>
                <TableCell className="text-base md:text-lg font-medium text-black/70">
                  {prayerTimes.Asr}
                </TableCell>
                <TableCell className="text-base md:text-lg font-medium text-black/70">
                  {prayerTimes.Maghrib}
                </TableCell>
                <TableCell className="text-base md:text-lg font-medium text-black/70">
                  {prayerTimes.Isha}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <p>{error ? error : "Loading..."}</p>
        )}
      </div>
      <div className="container mx-auto h-full ">
        <div className="flex items-center justify-start py-4">
          <h1 className="min-w-[90px] mr-4 text-xl font-semibold sm:text-2xl md:text-3xl">
            Al-Quran
          </h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base md:text-lg font-semibold text-black">
                No Surah
              </TableHead>
              <TableHead className="text-base md:text-lg font-semibold text-black">
                Nama Surah
              </TableHead>
              <TableHead className="text-base md:text-lg font-semibold text-black">
                Ayat
              </TableHead>
              <TableHead className="text-base md:text-lg font-semibold text-black">
                Audio
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quran &&
              quran.map((surah, index) => (
                <TableRow key={index}>
                  <TableCell className="text-base md:text-lg font-medium text-black/70">
                    <Link
                      to={`/quran/${surah.nomor}`}
                      className="block text-base md:text-lg font-medium"
                    >
                      {surah.nomor}
                    </Link>
                  </TableCell>
                  <TableCell className="text-base md:text-lg font-medium text-black/70">
                    <Link
                      to={`/quran/${surah.nomor}`}
                      className="block text-base md:text-lg font-medium"
                    >
                      ({surah.namaLatin}) {surah.nama}
                    </Link>
                  </TableCell>
                  <TableCell className="text-base md:text-lg font-medium text-black/70">
                    {surah.jumlahAyat}
                  </TableCell>
                  <TableCell className="text-base md:text-lg font-medium text-black/70">
                    <audio controls>
                      <source src={surah.audioFull["01"]} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
};

export default Home;
