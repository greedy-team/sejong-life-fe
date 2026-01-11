const SearchBar = () => {
  return (
    <div className="mt-10 flex w-[80%] overflow-hidden rounded-2xl border border-[#8BE34A] lg:w-[60%]">
      <input
        className="text- flex-1 px-5 py-4 outline-none"
        placeholder="궁금한 장소를 검색해보세요 !"
      />
      <button className="flex items-center justify-center bg-[#8BE34A] px-7">
        <img src="/asset/searchbar/search.svg" alt="search"></img>
      </button>
    </div>
  );
};

export default SearchBar;
