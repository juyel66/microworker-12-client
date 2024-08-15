import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import userAxiosPublic from "../../Hook/userAxiosPublic";
import useAuth from "../../Home/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
// import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
// import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";

const ManageTask = () => {
  const axiosPublic = userAxiosPublic();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);

  const {
    data: myTasks,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["addTask"],
    queryFn: async () => {
      const res = await axiosPublic.get("addTask/");
      return res.data;
    },
    enabled: !!user?.email, // Only run the query if the user email exists
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    document.getElementById("my_modal_4").showModal();
  };

  const handleDeleteUser = (myTasks) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/addTask/${myTasks._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="pl-3 pr-3 pb-3">
      <h1 className="text-center text-3xl mt-4">All Task: {myTasks.length}</h1>
      {myTasks?.length ? (
        <div>
          <div className="mt-4 mb-4 overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="lg:text-xl border-2  border-gray-800">
                  <th>No</th>
                  <th>Task Title</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myTasks?.map((task, index) => (
                  <tr className="border-2 border-gray-900" key={task._id}>
                    <td>{index + 1}</td>
                    <td className="py-2 px-4 border-b">{task.title}</td>
                    <td className="py-2 px-4 border-b">{task.quantity}</td>
                    <td className="py-2 px-4 border-b">${task.amount}</td>
                    <td className="flex space-x-2">
                      <button
                        className="btn rounded-full bg-[#743f8f]  text-[#ceedd8]"
                        onClick={() => handleViewDetails(task)}
                      >
                        View Details
                      </button>
                    
                    </td>
                    <td>
                    <button
                        onClick={() => handleDeleteUser(task)}
                        className="btn btn-xl rounded-full bg-[#743f8f]  text-[#ceedd8]  hover:bg-red-500 text-2xl"
                      >
                        <AiTwotoneDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Modal */}
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              {selectedTask && (
                // <div>
                //   <h3 className="font-bold text-lg">{selectedTask.title}</h3>
                //   <p className="py-4">Details: {selectedTask.details}</p>
                //   <p className="py-2">Quantity: {selectedTask.quantity}</p>
                //   <p className="py-2">Amount: ${selectedTask.amount}</p>
                //   <p className="py-2">
                //     Completion Date: {selectedTask.completionDate}
                //   </p>
                //   <p className="py-2">Submission Info: {selectedTask.SubmissionInfo}</p>
                //   <img src={selectedTask.image} alt={selectedTask.title} className="py-2 max-w-full h-auto" />
                // </div>
                <div>
                <div className="text-center">
                <div className="flex mt-2 justify-center items-center">  <img  src={selectedTask.image} alt=""  className=""/></div>
             
                <p className=" font-semibold lg:mt-4"><strong>Submission Details:</strong> {selectedTask.details}</p>
                <p className=" font-semibold"><strong>Task Title</strong> {selectedTask.title
                }</p>
                <p className=""><strong>Worker Name:</strong> {selectedTask.details}</p>
                <p className=""><strong>Worker Email:</strong> {selectedTask.quantity}</p>
                <p className=""><strong>Amount:</strong> ${selectedTask.amount}</p>
               </div>
                </div>
                
              )}
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      ) : (
        <div>
          <p className="text-center mt-5">No Task history available.</p>
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

export default ManageTask;
