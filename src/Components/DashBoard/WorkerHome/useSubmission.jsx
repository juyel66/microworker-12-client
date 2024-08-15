import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../../Hook/userAxiosPublic";
import useAuth from "../../Home/useAuth";


const useSubmission = () => {
    const axiosPublic = userAxiosPublic();
    const {user} = useAuth()
    const { data: MySubmission} = useQuery({
        queryKey: ['submissions', user?.email],
        queryFn: async () => {
          const res = await axiosPublic.get(`/submission/${user?.email}`);
          return res.data;
        },
        enabled: !!user?.email,
      });
    
    return [MySubmission]
};

export default useSubmission;