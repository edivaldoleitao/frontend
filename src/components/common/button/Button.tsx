interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ text, onClick, disabled = false }: ButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`
        text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md
        transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring-purple-500"
        }
      `}
    >
      {text}
    </button>
  );
};

export default Button;
