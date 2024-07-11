import React from "react";

export default function Button({ Type, onClick, Name, className }) {
  return (
    <button type={Type} onClick={onClick} className={className}>
      {Name}
    </button>
  );
}
