import React, { useState } from 'react';
import type { Place } from './model/types';

interface DirectInputProps {
  onAddItem: (name: string) => void;
  onRemoveItem: (item: Place) => void;
  manualItems: Place[];
}

const DirectInput: React.FC<DirectInputProps> = ({
  onAddItem,
  onRemoveItem,
  manualItems,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() === '') return;
    onAddItem(inputValue.trim());
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="mt-6 w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-center text-2xl font-bold text-gray-800">
        직접 입력하기
      </h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="장소명을 입력하세요"
          className="flex-grow rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none"
        />
        <button
          onClick={handleAdd}
          className="rounded-lg bg-[#8BE34A] px-6 py-2 font-semibold text-black transition-colors duration-300 hover:bg-[#7bcc42]"
        >
          추가
        </button>
      </div>
      {manualItems.length > 0 && (
        <div className="mt-4">
          <div className="max-h-32 space-y-2 overflow-y-scroll rounded-lg border border-gray-200 p-2">
            {manualItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-md bg-gray-100 px-3 py-1.5"
              >
                <span className="text-sm text-gray-800">{item.name}</span>
                <button
                  onClick={() => onRemoveItem(item)}
                  className="font-bold text-red-500 hover:text-red-700"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectInput;
