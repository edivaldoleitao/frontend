import HomeLayout from "../../components/layouts/homeLayout";
import { useConfirmAccount } from "../../features/confirmAccount/hooks/useConfirmAccount";

const ConfirmAccount = () => {
  const { loading, message, isSuccess, countdown } = useConfirmAccount();

  if (loading) {
    return (
      <HomeLayout showSearch={false}>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-lg">Verificando sua conta...</p>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout showSearch={false}>
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
          {isSuccess && countdown > 0 && (
            <p className="text-sm mt-4">
              Você será redirecionado para o login em <strong>{countdown}</strong> segundos...
            </p>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default ConfirmAccount;
