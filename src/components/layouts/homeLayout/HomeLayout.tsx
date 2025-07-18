
import { useNavigate } from "react-router-dom";
import AppBar from "../../common/appBar";
import type { ReactNode } from "react";
import Footer from "../../common/footer/Footer";

interface HomeLayoutProps {
  children: ReactNode;
  showSearch?: boolean;
  showFooter?: boolean;
}

const HomeLayout = ({ children, showSearch = true, showFooter = true }: HomeLayoutProps) => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/produtos?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppBar onSearch={handleSearch} showSearch={showSearch} />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default HomeLayout;
