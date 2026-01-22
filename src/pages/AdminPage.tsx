import { useNavigate } from 'react-router-dom';
// import { USER_ROLE, type UserRole } from '../types/role';

function AdminPage() {
  const navigate = useNavigate();

  //   if (role !== USER_ROLE.ADMIN) {
  //     return (
  //       <div className="mx-auto mt-90 flex flex-col items-center justify-center gap-5">
  //         <div className="text-xl font-semibold text-gray-500">
  //           관리자 페이지 접근 권한이 없습니다
  //         </div>
  //         <button
  //           type="button"
  //           onClick={() => navigate(`/`)}
  //           className="mb-10 h-15 w-54 cursor-pointer rounded-xl border border-[#8BE34A] bg-[#77db30] px-6 py-3 font-semibold text-white hover:bg-[#8BE34A]"
  //         >
  //           슬종생 사이트 돌아가기 →
  //         </button>
  //       </div>
  //     );
  //   }

  return (
    <div className="mx-auto w-[80%] py-10">
      <h1 className="flex w-full border-b-2 py-10 text-4xl font-semibold text-[#8BE24A]">
        관리자 페이지
      </h1>
      <div className="mt-50 flex flex-col items-center">
        <button
          type="button"
          onClick={() =>
            navigate(`/admin/places`, {
              state: { title: '장소관리', from: '/admin' },
            })
          }
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
