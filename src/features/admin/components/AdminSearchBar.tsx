import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const AdminSearchBar = () => {
  const [searchParams] = useSearchParams();
  const initial = searchParams.get('keyword') ?? '';
  const [keyword, setKeyword] = useState(initial);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = keyword.trim();
    if (!trimmed) return [];
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex w-[80%] overflow-hidden rounded-2xl border border-[#8BE34A]"
    >
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 px-5 py-4 text-sm outline-none lg:text-base"
        placeholder="추가하거나 삭제할 장소명을 입력하세요"
      />
      <button
        type="submit"
        className="flex items-center justify-center bg-[#8BE34A] px-4.5 lg:px-7"
      >
        <img src="/asset/searchbar/search.svg" alt="search"></img>
      </button>
    </form>
  );
};

export default AdminSearchBar;
