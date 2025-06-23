import type { ReactNode } from "react";
import AppBar from "../../common/appBar";


interface LayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppBar />
      <main className="pb-6">
        {children}
      </main>
    </div>
  );
};

export default HomeLayout;