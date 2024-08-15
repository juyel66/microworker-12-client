import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../../Hook/userAxiosPublic";
import useAuth from "../../Home/useAuth";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

const MySubmissions = () => {
  const axiosPublic = userAxiosPublic();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ['submissions', user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/submission/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <div className="flex mt-40 justify-center"><span className="loading  loading-spinner w-40 "></span> </div>;
  }

  if (error) {
    return    <div className="lg:flex justify-center">
    <div className="flex-1 lg:hidden">
      <Player
        autoplay
        loop
        src="https://lottie.host/d53b7a3a-8883-4460-9f16-387491682f1b/1mS2ZVJ0Zj.json"
        style={{ height: "300px", width: "200px" }}
      ></Player>
    </div>

    <div className="lg:flex hidden">
      <Player
        autoplay
        loop
        src="https://lottie.host/d53b7a3a-8883-4460-9f16-387491682f1b/1mS2ZVJ0Zj.json"
        style={{ height: "500px", width: "600px" }}
      ></Player>
    </div>
  </div>;
  }

  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data ? data.slice(startIndex, endIndex) : [];

  return (
    <div className="pl-10 pr-10">
      {data && data?.length  > 0 ? (
        <div>
          <div className="flex justify-between mt-5">
            <h1 className="text-3xl text-center font-semibold">
              My Submissions: {data.length}
            </h1>
            <Link to='/dashboard/withdrawals' className="btn rounded-full bg-[#743f8f]  text-[#ceedd8] text-3xl">Withdraw Coin</Link>
          </div>
          <div className="mt-4 mb-4 overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="lg:text-xl border-2  border-gray-800">
                  <th>No</th>
                  <th>Task Title</th>
                  <th>Details</th>
                  <th>Amount</th>
                  <th>Submission Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((submission, index) => (
                  <tr className="border-2 border-gray-900" key={submission._id}>
                    <td>{startIndex + index + 1}</td>
                    <td className="py-2 px-4 border-b">{submission.taskTitle}</td>
                    <td className="py-2 px-4 border-b">{submission.submissionDetails}</td>
                    <td className="py-2 px-4 border-b">${submission.payableAmount}</td>
                    <td className="py-2 px-4 border-b">{submission.currentDate}</td>
                    <td className={`py-2 px-4 ${submission.status === 'approved' && 'text-green-500 font-bold'}
                  ${submission.status === 'Rejected' && 'text-red-500 font-bold'}
                  border-b`}>{submission.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center gap-5 mt-5">
            <button
              className={`btn ${currentPage === 1 ? "btn-disabled" : "bg-[#743f8f] text-[#ceedd8]"}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {pageNumbers.map(pageNumber => (
              <button
                key={pageNumber}
                className={`btn ${pageNumber === currentPage ? "btn-active" : "btn-primary"}`}
                onClick={() => handleClickPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className={`btn ${currentPage >= totalPages ? "btn-disabled" : "bg-[#743f8f] text-[#ceedd8]"}`}
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>
               <div className="lg:flex justify-center">
            <div className="flex-1 lg:hidden">
              <Player
                autoplay
                loop
                src="https://lottie.host/d53b7a3a-8883-4460-9f16-387491682f1b/1mS2ZVJ0Zj.json"
                style={{ height: "300px", width: "200px" }}
              ></Player>
            </div>

            <div className="lg:flex hidden">
              <Player
                autoplay
                loop
                src="https://lottie.host/d53b7a3a-8883-4460-9f16-387491682f1b/1mS2ZVJ0Zj.json"
                style={{ height: "500px", width: "600px" }}
              ></Player>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
