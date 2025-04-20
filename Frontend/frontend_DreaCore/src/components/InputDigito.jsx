import React, { forwardRef } from "react";

const InputDigito = forwardRef(({ index, value, onChange, onBackspace, focusNext, focusPrev }, ref) => {
  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").charAt(0);
    onChange(index, val);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && !value) {
      onBackspace(index);
      focusPrev(index);
    }
  };

  return (
    <input
      ref={ref}
      type="text"
      inputMode="numeric"
      maxLength={1}
      className="text-black bg-white w-12 h-12 text-center border-2 border-green-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
});

// 👇 Esta línea es la clave:
export default InputDigito;