interface InputProps {
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  value?: string;
}

const Input: React.FC<InputProps> = ({ disabled, onChange, placeholder, type, value }) => {
  return (
    <input
      className="w-full text-lg p-4 bg-black text-white border-2 border-neutral-800 rounded-md outline-none focus:border-sky-400 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70"
      disabled={disabled}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};

export default Input;
