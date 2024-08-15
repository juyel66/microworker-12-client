import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../../Hook/userAxiosPublic";
import { useState, useEffect } from "react";
import useAuth from "../../Home/useAuth";
import Swal from "sweetalert2";
import TaskCreatorState from "../TaskCreatorState/TaskCreatorState";
import { Player } from "@lottiefiles/react-lottie-player";

const TaskReview = () => {
  const axiosPublic = userAxiosPublic();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubmission, setSelectedSubmission] = useState(null); // State to hold selected submission
  const itemsPerPage = 10;

  const { data, isLoading, error,refetch } = useQuery({
    queryKey: ['submissions', user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/submission/${user?.email}`);
      return res.data;
      
    },
    
    enabled: !!user?.email,
  });
  

  console.log(data);

  useEffect(() => {
    if (selectedSubmission) {
      document.getElementById('my_modal_4').showModal();
    }
  }, [selectedSubmission]);

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

  const openModal = (submission) => {
    setSelectedSubmission(submission);
  };

  if (isLoading) {
    return <div className="flex mt-40 justify-center"><span className="loading loading-spinner w-40"></span></div>;
  }

  if (error) {
    return console.error('juyel')
  }

  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data ? data.slice(startIndex, endIndex) : [];


  // // approve 
  // const handleApprove = () =>{
  //   console.log('working')
    

  // }
  // // reject  
  // const handleReject = () =>{
    
  // }

  const handleStatus = async(id,prevStatus, status) =>{
    if(prevStatus === status) return console.log('sorry vai')
    console.log(id,prevStatus, status)
    const {data} =await axiosPublic.patch(`/submission/${id}`,{status})
    console.log(data)

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Success",
      showConfirmButton: false,
      timer: 1500
    });
   
    refetch()
    
  }




   


  return (
    <div className="text-[#0a040e]" >
      <div>
        <h1 className="text-3xl pl-4">Task Creator state</h1>
        <div >
          <TaskCreatorState ></TaskCreatorState>
          


        </div>
      </div>
      <h1 className="text-3xl text-center font-semibold mt-3"> Submissions Review ({data.length})</h1>

      {
        data.length > 0 ? 
        <div>
<div className="p-4">
        <div className="flex justify-between">
        </div>
        <div className="mt-4 mb-4 overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="lg:text-xl border-2  border-gray-800">
                <th>No</th>
                <th>Worker Name</th>
                <th>Worker Email</th>
                <th>Amount</th>
                <th>View Details</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((submission, index) => (
                <tr className="border-2 border-gray-900" key={submission._id}>
                  <td>{startIndex + index + 1}</td>
                  <td className="py-2 px-4 border-b">{submission.workerName}</td>
                  <td className="py-2 px-4 border-b">{submission.email}</td>
                  <td className="py-2 px-4 border-b">${submission.payableAmount}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="btn bg-[#c17ae5] rounded-full text-[#ceedd8]"  onClick={() => openModal(submission)}>View Details</button>
                  </td>
                  <td className={`py-2 px-4 ${submission.status === 'approved' && 'text-green-500 font-bold'}
                  ${submission.status === 'Rejected' && 'text-red-500 font-bold'}
                  border-b`}>{submission.status}</td>

                  {/* <td className="py-2 px-4 border-b">Approve</td> */}
                  <button disabled={submission.status === 'approved'} onClick= {() => handleStatus(submission._id, submission.status, 'approved')} className={` btn bg-[#743f8f]  text-white px-2 py-2 mt-2`}>Approve</button>
                  <button disabled={submission.status === 'approved'}  onClick= {() => handleStatus(submission._id, submission.status, 'Rejected')}    className="btn text-[#ceedd8]  bg-pink-500">Reject</button>
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

      {/* Modal for showing submission details */}
      {selectedSubmission && (
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <div>
            <div className="text-center">
            <div className="flex justify-center items-center">  <img  src={selectedSubmission.image} alt="" /></div>
         
            <p className=" font-semibold"><strong>Submission Details:</strong> {selectedSubmission.submissionDetails}</p>
            <p className=" font-semibold"><strong>Task Title</strong> {selectedSubmission.taskTitle
            }</p>
            <p className=""><strong>Worker Name:</strong> {selectedSubmission.workerName}</p>
            <p className=""><strong>Worker Email:</strong> {selectedSubmission.email}</p>
            <p className=""><strong>Amount:</strong> ${selectedSubmission.payableAmount}</p>
           </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn bg-[#743f8f] text-[#ceedd8]">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
</div> :
<div>
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

</div>
      }


    </div>
  );
};

export default TaskReview;
