import React from "react";

export default function InputField({
  Type,
  Name,
  Id,
  Placeholder,
  onChange,
  Value,
  className,
}) {
  return (
    <input
      type={Type}
      name={Name}
      id={Id}
      placeholder={Placeholder}
      onChange={onChange}
      value={Value}
      className={className}
    />
  );
}
