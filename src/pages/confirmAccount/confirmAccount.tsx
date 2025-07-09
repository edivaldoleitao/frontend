import { useEffect, useState } from "react";
import HomeLayout from "../../components/layouts/homeLayout";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../service/api";

interface response {
  status: string;
  message: string;
}

const ConfirmAccount = () => {
  const [message, setMessage] = useState("Conta confirmada com sucesso!");
  const [isSuccess, setIsSuccess] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiRequest<response>(
          `/users/confirm_email/${id}/`
        );

        setMessage(response.message);
        setIsSuccess(response.status === "success");
      } catch (error) {
        setMessage("Erro ao confirmar a conta. Tente novamente mais tarde.");
        setIsSuccess(false);
        console.error("Erro na confirmação da conta:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <HomeLayout>
      <div className="flex justify-center items-center min-h-[60vh]">
        <div
          className={`max-w-lg w-full rounded-2xl shadow-md p-8 text-center ${
            isSuccess
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <h2 className="text-xl font-semibold mb-2">
            {isSuccess ? "Sucesso!" : "Ops..."}
          </h2>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ConfirmAccount;
