import Footer from "./footer";
import Navbar from "./navbar";

interface IProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
