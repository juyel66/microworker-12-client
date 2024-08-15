// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../Hook/useAxiosSecure";
// import { useContext } from "react";
// import { UserContext } from "../../Context/UserContext"; // Assuming you have a UserContext

import { useContext } from "react";
// import useAxiosSecure from "../../Hook/useAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../../Hook/userAxiosPublic";
import useUserData from "../useUserData/useUserData";


const TaskCreatorState = () => {
  const [workerData] = useUserData();
  console.log('worker data',workerData);
  const axiosPublic = userAxiosPublic();
  const { user } = useContext(AuthContext); // Assuming user context provides logged-in user info
  const userEmail = user?.email; // Get the logged-in user's email

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/user");
      return res.data;
    },
  });
  

  const loggedInUserCoins = users?.find((item) => item.email === userEmail)?.coin || 0;

  console.log("Logged in user's coin data", loggedInUserCoins);
  // refetch();

  const { data } = useQuery({
    queryKey: ['submissions', user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/submission/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const pendingData = data.filter(value => value.status === 'pending');
  console.log('pending data : ',pendingData);
  const paidData = data.filter(value => value.status === 'approved');
  console.log('pending data : ',paidData);

  console.log( 'coin',loggedInUserCoins)




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
          <h1 className="lg:text-3xl">Pending Task: {pendingData.length}</h1>
        </div>
      </div>
      <div className="card w-96 border-2 border-gray-300 bg-[#743f8f] text-[#ceedd8] shadow-xl">
        <div className="card-body">
          <div className="card-actions justify-end">
          </div>
          <h1 className="lg:text-3xl">Total paid: {paidData.length}</h1>
        </div>
      </div>

      </div>

    </div>
  );
};

export default TaskCreatorState;
