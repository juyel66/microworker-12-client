import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../Home/useAuth";
// import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
// import userAxiosPublic from "../../Hook/userAxiosPublic";
import useAxiosSecure from "../../Hook/useAxiosSecure";
// import useAxiosSecure from "../../Hook/useAxiosSecure";


const useUserData = () => {

    // const {user} = useAuth();
    const {user} = useContext(AuthContext);
    // console.log('logged in user', user);
    const axiosSecure = useAxiosSecure();
    // const axiosPublic = userAxiosPublic()
    const {data: workerData =[], refetch } = useQuery({
        queryKey: ['workerData', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/users/${user?.email}`)
            // const res = await axiosPublic.get('https://server-theta-umber.vercel.app/users/mdjuyelrana.com.bd1@gmail.com')
            console.log(res.data);
            return res.data; 
        }
    })
    return [workerData, refetch]
};

export default useUserData;