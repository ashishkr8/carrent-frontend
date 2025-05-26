import "./css/Input.css";

interface InputProps {
  width?: string;
  label_head: string;
  type?: string;
  error_message?: string;
  border?: string;
  name: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
const Input: React.FC<InputProps> = ({
  width = "100%",
  label_head,
  type = "text",
  error_message = "",
  border = "gray",
  name,
  id,
  value,
  onChange,
  placeholder = "",
}) => {
  return (
    <div className="input-container" style={{ width }}>
      <label htmlFor={id || name}>{label_head}</label>
      <input
        style={{ border: `1px solid ${border}` }}
        type={type}
        id={id || name}
        name={name}
        className="input-box"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error_message && <div className="error-text">{error_message}</div>}
    </div>
  );
};

export default Input;
