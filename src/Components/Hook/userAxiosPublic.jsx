import axios from "axios";



export const axiosPublic = axios.create({
    baseURL: 'https://server-theta-umber.vercel.app/'
})
const userAxiosPublic = () => {
    return axiosPublic;
};

export default userAxiosPublic;