import React, { useState } from 'react';
import Select from 'react-select';

function MultiSelectInput() {
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'mango', label: 'Mango' },
    { value: 'grape', label: 'Grape' }
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedOptions : any) => {
    setSelectedOptions(selectedOptions);
  };

  return (
    <div className="w-full max-w-md">
      <label className="block text-gray-700 text-left font-bold mb-2">Select Fruits:</label>
      <Select
        options={options}
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        className="basic-multi-select"
        classNamePrefix="select"
      />
      <div className="mt-4">
        {selectedOptions.map((option: any) => (
          <span key={option.value} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {option.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MultiSelectInput;
