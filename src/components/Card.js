// src/components/Card.js
import React from 'react';

const Card = ({ title, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="text-3xl font-bold">{children}</div>
    </div>
  );
};

export default Card;
