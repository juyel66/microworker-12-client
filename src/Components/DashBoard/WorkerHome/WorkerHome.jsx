import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../../Hook/userAxiosPublic";
import useAuth from "../../Home/useAuth";
import useUserData from "../useUserData/useUserData";
import useSubmission from "./useSubmission";
import { Player } from "@lottiefiles/react-lottie-player";



const WorkerHome = () => {
    const axiosPublic = userAxiosPublic();
    const {user} = useAuth();
    const [workerData] = useUserData();
    const [MySubmission] = useSubmission();
    console.log('my submission result is: ',MySubmission);
    

    const { data, isLoading, error } = useQuery({
      queryKey: ['submissions', user?.email],
      queryFn: async () => {
        const res = await axiosPublic.get(`/submission/${user?.email}`);
        return res.data;
      },
      enabled: !!user?.email,
    });

      if(isLoading) return <div>loading...</div>
      if(error) return console.error(error.message)
    //   console.log('data is', data)
  

  

      const approveData = data.filter(item => item.status === 'approved')
      console.log('approve data is',approveData);

      
    return (
        <div>


<div className="grid pl-4 mb-10 mt-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      <div className="card border-2 border-gray-300 w-96 bg-[#743f8f] text-[#ceedd8] shadow-xl">
        <div className="card-body">
          <div className="card-actions justify-end">
          </div>
          <h1 className="lg:text-3xl">Available Coin: {workerData.coin}</h1>
        </div>
      </div>
      <div className="card w-96 border-2 border-gray-300 bg-[#743f8f] text-[#ceedd8] shadow-xl">
        <div className="card-body">
          <div className="card-actions justify-end">
          </div>
          <h1 className="lg:text-3xl">Total Submission: {MySubmission.length}</h1>
        </div>
      </div>
 

      </div>



            <h1 className="text-3xl text-center font-semibold mt-5">All Approved data: {approveData.length}</h1>
            <div className="pl-10 pr-10">
      {data && data?.length  > 0 ? (
        <div>
          <div className="flex justify-between mt-5">
            
        
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
                {approveData.map((approve, index) => (
                  <tr className="border-2 border-gray-900" key={approve._id}>
                    <td>{index  + 1}</td>
                    <td className="py-2 px-4 border-b">{approve.taskTitle}</td>
                    <td className="py-2 px-4 border-b">{approve.submissionDetails}</td>
                    <td className="py-2 px-4 border-b">${approve.payableAmount}</td>
                    <td className="py-2 px-4 border-b">{approve.currentDate}</td>
                    <td className="mt-2 mb-2 text-green-500 font-bold  border-b">{approve.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

            
        </div>
    );
};

export default WorkerHome;