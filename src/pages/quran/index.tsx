import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "@/components/main-layout";
import { ApiResponse, Surah } from "@/lib/interfaces/interfaces";

const Quran = () => {
  const { surah } = useParams<{ surah: string }>();
  const [surahDetails, setSurahDetails] = useState<Surah | null>(null);

  useEffect(() => {
    const fetchDetailQuran = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://equran.id/api/v2/surat/${surah}`
        );
        setSurahDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching detail quran:", error);
      }
    };

    if (surah) {
      fetchDetailQuran();
    }
  }, [surah]);

  if (!surahDetails) return <div>Loading...</div>;

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">
          {surahDetails.namaLatin} ({surahDetails.nama})
        </h1>
        <p className="mb-2">Arti: {surahDetails.arti}</p>
        <p className="mb-2">Deskripsi: {surahDetails.deskripsi}</p>
        <h3 className="text-lg font-semibold mb-2">Ayat:</h3>
        {surahDetails.ayat.map((ayat) => (
          <div key={ayat.nomorAyat} className="mb-4">
            <p className="text-lg font-semibold">
              {ayat.nomorAyat}. {ayat.teksArab}
            </p>
            <p className="text-sm">{ayat.teksLatin}</p>
            <p className="text-sm">{ayat.teksIndonesia}</p>
            <audio controls>
              <source src={ayat.audio["01"]} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Quran;
