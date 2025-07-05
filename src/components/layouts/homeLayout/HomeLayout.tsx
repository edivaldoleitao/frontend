
import { useNavigate } from "react-router-dom";
import AppBar from "../../common/appBar";
import type { ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/produtos?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppBar onSearch={handleSearch} />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default HomeLayout;
