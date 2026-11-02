import React from 'react';

const LoadingSpinner = ({ text = 'Loading luxury homes...', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div
        className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-forest-200 border-t-forest-700 animate-spin mb-4`}
      />
      {text && (
        <p className="text-sm tracking-wide text-charcoal-600 font-medium">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
