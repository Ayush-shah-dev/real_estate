import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  glass?: boolean;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  className = '',
  children,
  glass = false,
  footer,
}) => {
  const baseClasses = glass 
    ? 'card-glass' 
    : 'card';
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
      )}
      
      <div>{children}</div>
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;