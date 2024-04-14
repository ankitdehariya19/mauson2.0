import React from 'react';

type SearchHistoryProps = {
  searchHistory: string[];
  setCity: (city: string) => void;
  clearSearchHistory: () => void;
};

const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchHistory,
  setCity,
  clearSearchHistory,
}) => {
  return (
    <div className="bg-white w-full max-w-full rounded-lg p-4">
      <div className="overflow-y-auto max-h-48">
        {searchHistory?.map((city, index) => (
          <div
            key={index}
            onClick={() => {
              setCity(city);
            }}
            className="p-3 cursor-pointer my-2 text-sm rounded-lg text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {city}
          </div>
        ))}
      </div>
      {searchHistory.length > 0 && (
        <button
          onClick={clearSearchHistory}
          className="w-full mt-4 text-white text-sm py-2 rounded-md bg-violet-500 hover:bg-violet-600 transition-colors"
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default SearchHistory;
