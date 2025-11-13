import React from 'react';

const Select = ({ label, options, className = '', error, ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-2.5 bg-gray-700 border rounded-lg text-gray-100 
          focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
          ${error ? 'border-error' : 'border-gray-600'}
          ${className}
        `}
        {...props}
      >
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default Select;

