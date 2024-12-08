interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeHolderText: string;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default InputProps;
