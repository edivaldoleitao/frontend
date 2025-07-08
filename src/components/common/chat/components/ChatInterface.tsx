import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext.tsx";
import roboImg from "../../../../assets/trackbot.png";
import Chat from "./Chat"; 
import { useEffect } from "react";

const ChatInterface = ({ initialMessages = [] }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setTimeout(() => navigate("/login"), 1000);
    }
  }, [navigate]);

  return (
    <div className="h-screen">
      {!user && (
        <div className="flex flex-col items-center mt-6">
          <img src={roboImg} alt="TrackBot" className="w-10 h-10 mb-2" />
          <h2 className="text-2xl font-bold text-blue-600">Olá, eu sou o TrackBot</h2>
          <p className="text-blue-600">Consultor de compras</p>
        </div>
      )}

      <Chat initialMessages={initialMessages} />
    </div>
  );
};

export default ChatInterface;
