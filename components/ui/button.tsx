interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  fullWidth,
  label,
  large,
  onClick,
  outline,
  secondary,
}) => {
  return (
    <button
      className={`
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-full
    font-semibold
    hover:opacity-60
    transition
    border-2
    ${fullWidth ? 'w-full' : 'w-fit'}
    ${secondary ? 'bg-white' : 'bg-sky-400'}
    ${secondary ? 'text-black' : 'text-white'}
    ${secondary ? 'border-white' : 'border-sky-400'}
    ${large ? 'text-xl' : 'text-md'}
    ${large ? 'px-5' : 'px-4'}
    ${large ? 'py-3' : 'py-2'}
    ${outline ? 'bg-transparent' : ''}
    ${outline ? 'border-white' : ''}
    ${outline ? 'text-white' : ''}
  `}
      disabled={disabled}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
