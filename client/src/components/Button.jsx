const Button = ({
  label,
  onClick,
  type = "button",
  disabled,
  small,
  color,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        m-1
        text-white
        ${color ? color : "bg-blue-500"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "py-1" : "py-2"}
        ${small ? "px-2" : "px-4"}
        ${small ? "font-medium" : "font-semibold"}
      `}
    >
      {label}
    </button>
  );
};
export default Button;
