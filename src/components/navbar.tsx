import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-[78px] w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full flex items-center justify-between">
        <Link
          to={""}
          className="font-inknut text-sm sm:text-lg md:text-xl text-white"
        >
          Moeslem
        </Link>
        <ul className="hidden sm:flex items-center justify-center gap-4">
          <li className="group">
            <Link
              to={""}
              className="font-semibold text-base sm:text-sm text-white group-hover:text-accent"
            >
              Donate Buat Beli Kopi
            </Link>
          </li>
        </ul>
        <Button variant={"ghost"} className="block sm:hidden p-0 text-white">
          <MenuIcon />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
