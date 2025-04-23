import React from 'react';
import ReactSelect from 'react-select';
import { useAppContext } from '../../context/AppContext';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value: Option | null;
  onChange: (option: Option | null) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isMulti?: boolean;
  isLoading?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  isSearchable = false,
  isMulti = false,
  isLoading = false,
  error,
  helperText,
  className = '',
}) => {
  const { darkMode } = useAppContext();
  
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: darkMode ? '#1f2937' : 'white',
      borderColor: error 
        ? '#ef4444' 
        : (darkMode ? '#4b5563' : '#d1d5db'),
      boxShadow: state.isFocused 
        ? (error 
          ? '0 0 0 1px #ef4444' 
          : '0 0 0 1px #3b82f6') 
        : 'none',
      '&:hover': {
        borderColor: error 
          ? '#ef4444' 
          : (darkMode ? '#6b7280' : '#9ca3af'),
      },
      borderRadius: '0.5rem',
      padding: '2px',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#2563eb' 
        : (state.isFocused 
          ? (darkMode ? '#374151' : '#f3f4f6') 
          : 'transparent'),
      color: state.isSelected 
        ? 'white' 
        : (darkMode ? '#f9fafb' : '#111827'),
      '&:active': {
        backgroundColor: darkMode ? '#374151' : '#e5e7eb',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: darkMode ? '#1f2937' : 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      zIndex: 20,
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: darkMode ? '#9ca3af' : '#9ca3af',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: darkMode ? '#f9fafb' : '#111827',
    }),
    input: (provided: any) => ({
      ...provided,
      color: darkMode ? '#f9fafb' : '#111827',
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: darkMode ? '#4b5563' : '#d1d5db',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: darkMode ? '#9ca3af' : '#6b7280',
    }),
    loadingIndicator: (provided: any) => ({
      ...provided,
      color: darkMode ? '#60a5fa' : '#3b82f6',
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: darkMode ? '#374151' : '#e5e7eb',
      borderRadius: '0.375rem',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: darkMode ? '#f9fafb' : '#111827',
      padding: '0.125rem 0.25rem',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: darkMode ? '#9ca3af' : '#6b7280',
      '&:hover': {
        backgroundColor: darkMode ? '#4b5563' : '#d1d5db',
        color: darkMode ? '#f9fafb' : '#111827',
      },
    }),
  };

  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      
      <ReactSelect
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isMulti={isMulti}
        isLoading={isLoading}
        styles={customStyles}
        classNamePrefix="select"
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#2563eb',
            primary75: '#3b82f6',
            primary50: '#60a5fa',
            primary25: darkMode ? '#1e3a8a20' : '#dbeafe',
            danger: '#ef4444',
            dangerLight: darkMode ? '#7f1d1d40' : '#fee2e2',
            neutral0: darkMode ? '#1f2937' : 'white',
            neutral5: darkMode ? '#374151' : '#f9fafb',
            neutral10: darkMode ? '#4b5563' : '#f3f4f6',
            neutral20: darkMode ? '#6b7280' : '#e5e7eb',
            neutral30: darkMode ? '#9ca3af' : '#d1d5db',
            neutral40: darkMode ? '#9ca3af' : '#9ca3af',
            neutral50: darkMode ? '#9ca3af' : '#9ca3af',
            neutral60: darkMode ? '#d1d5db' : '#6b7280',
            neutral70: darkMode ? '#e5e7eb' : '#4b5563',
            neutral80: darkMode ? '#f3f4f6' : '#1f2937',
            neutral90: darkMode ? '#f9fafb' : '#111827',
          },
        })}
      />
      
      {(helperText || error) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Select;