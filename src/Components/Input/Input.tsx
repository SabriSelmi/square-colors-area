import "./Input.css";

interface NumberInputProps {
  value: number;
  id : string;
  onChange: (id : string, newValue: number) => void;
  label : string;
  placeholder? : string;
}

const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, label, placeholder, id }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^\d.-]/g, ""); // remove non-numeric characters
    onChange(id, parseFloat(newValue)); // pass the values to the parent component
  };

  return (
    <div className="form-group">
        <label htmlFor={id} className="label mrg-r-15"> {label} </label>
        <input
            className="number-input"
            type="text"
            id={id}
            value={value || ""}
            placeholder={placeholder}
            onChange={handleInputChange}
            required
        />
    </div>
    
  );
};

export default NumberInput;
