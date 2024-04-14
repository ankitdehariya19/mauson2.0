import React, { useState, useEffect, useRef } from 'react';

const useOutsideClick = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, handleClickOutside]);
};

interface CustomDropdownProps {
  options: string[];
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedOption,
  onSelectOption,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchTerm(''); 
  };

  const handleOptionSelect = (option: string) => {
    onSelectOption(option);
    setIsOpen(false); 
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={dropdownRef} className="relative inline-block text-left  my-2 w-full ">
      <div>
        <button
          type="button"
          className="bg-white inline-flex justify-between w-80 mx-1 rounded-md border border-gray-300 shadow-sm px-4 py-2  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleToggleDropdown}
        >
          <span>{selectedOption || placeholder}</span>
          <svg
            className={`w-4 h-4 ml-2 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fillRule="evenodd"
              d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="bg-white absolute z-10 mt-2 w-full max-h-56 overflow-y-auto rounded-md shadow-lg  border border-gray-200"
        style={{
            WebkitOverflowScrolling: 'touch', 
            scrollbarWidth: 'thin',
            scrollbarColor: '#888 #f1f1f1', 
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="bg-white block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-400 border-b border-gray-200 focus:outline-none focus:border-none focus:ring-0"
          />
          <div>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  className="block w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No options found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
//clear