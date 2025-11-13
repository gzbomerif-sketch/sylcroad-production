import React from 'react';

const Input = ({ 
  label, 
  error, 
  icon: Icon,
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        )}
        <input
          className={`
            w-full px-4 py-2.5 bg-gray-700 border rounded-lg text-gray-100 
            placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-error' : 'border-gray-600'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;

