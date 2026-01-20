import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto w-[80%] py-10">
      <h1 className="flex w-full border-b-2 py-10 text-4xl font-semibold text-[#8BE24A]">
        관리자 페이지
      </h1>
      <div className="mt-50 flex flex-col items-center">
        <button
          type="button"
          onClick={() => navigate(`/admin/places`)}
          className="mb-10 cursor-pointer rounded-xl border border-[#8BE34A] bg-[#77db30] px-6 py-3 font-semibold text-white hover:bg-[#8BE34A]"
        >
          장소 관리 →
        </button>
        <button
          type="button"
          className="mb-10 cursor-pointer rounded-xl border border-[#8BE34A] bg-[#77db30] px-6 py-3 font-semibold text-white hover:bg-[#8BE34A]"
        >
          리뷰 관리 →
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
