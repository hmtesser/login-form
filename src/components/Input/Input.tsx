import React from 'react';
import InputProps from '../../models/InputProps';

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  placeHolderText,
  error,
}) => {
  return (
    <div>
      <label className="text-lg font-medium" htmlFor={name}>
        {label}

        <input
          className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
          placeholder={placeHolderText}
          name={name}
          id={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          type={type}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </label>
    </div>
  );
};

export default Input;
