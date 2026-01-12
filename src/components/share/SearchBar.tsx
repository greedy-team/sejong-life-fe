import { useState } from 'react';
import { fetchSearchResult } from '../../api/searchResultApi';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetchSearchResult({ keyword });
    console.log(response);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex w-[80%] overflow-hidden rounded-2xl border border-[#8BE34A] lg:w-[60%]"
    >
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="text- flex-1 px-5 py-4 outline-none"
        placeholder="궁금한 장소를 검색해보세요 !"
      />
      <button
        type="submit"
        className="flex items-center justify-center bg-[#8BE34A] px-7"
      >
        <img src="/asset/searchbar/search.svg" alt="search"></img>
      </button>
    </form>
  );
};

export default SearchBar;
