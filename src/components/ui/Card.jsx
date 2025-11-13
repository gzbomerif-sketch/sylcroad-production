import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = true,
  ...props
}) => {
  return (
    <div 
      className={`
        bg-gray-800 
        rounded-xl 
        border border-gray-700 
        ${padding ? 'p-6' : ''}
        ${hover ? 'transition-all duration-200 hover:border-primary-500 hover:shadow-glow cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

