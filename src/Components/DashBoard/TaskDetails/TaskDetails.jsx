import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import userAxiosPublic from "../../Hook/userAxiosPublic";
import { useState } from 'react';
import useAuth from '../../Home/useAuth';
import Swal from 'sweetalert2';
import Countdown from 'react-countdown';
import { IoReloadSharp } from 'react-icons/io5';

const Completionist = () => <span>You are good to go!</span>;

const TaskDetails = () => {
    const { id } = useParams();  
    const axiosPublic = userAxiosPublic();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const [showDetails, setShowDetails] = useState(false);

    const { data, error, isLoading } = useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/addTask/${id}`);
            return res.data;
        },
        enabled: !!id,  
    });

    const [submissionDetails, setSubmissionDetails] = useState('');

    const mutation = useMutation({
        mutationFn: async (newSubmission) => {
            return await axiosPublic.post('/submission', newSubmission);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['task', id]); 
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Submission Successful",
                showConfirmButton: false,
                timer: 1500
            });
            setSubmissionDetails('');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentDate = new Date().toLocaleString({ timeZone: 'Asia/Dhaka' });
        const newSubmission = {
            taskId: data._id,
            taskTitle: data.title,
            taskDetails: data.details,
            image: data.image,
            payableAmount: data.amount,
            email: user?.email,
            submissionDetails: submissionDetails,
            workerName: user?.displayName,
            creatorName: data.name,
            creatorEmail: data.email,
            currentDate: currentDate,
            status: "pending",
        };

        mutation.mutate(newSubmission);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading task details</div>;
    }

    return (
        <div>
            {!showDetails ? (
             <div className='text-5xl text-center mt-[300px] font-bold'>
              <div className='animate-spin text-center flex justify-center'> <IoReloadSharp  /></div>
                <Countdown date={Date.now() + 5000} onComplete={() => setShowDetails(true)}>
                    <Completionist />
                </Countdown>
                
               
             </div>
            ) : (
                <div className='pr-10 pl-10 mt-3'>
                    <h1 className="text-3xl font-semibold text-center">Task Details</h1>
                    <div className="flex flex-col mt-3 mb-10 md:flex-row justify-around gap-5 items-center min-h-[calc(100vh-306px)] mx-auto">
                        <div className="flex-1 border-2 border-gray-900 lg:px-4 lg:py-7 bg-[#bf81de] rounded-md shadow-md md:min-h-[350px]">
                            <img className="h-[250px] object-cover lg:w-[1000px] lg:ml-[100px]" src={data.image} alt="" />
                            <div className='text-center'>
                                <h1 className="mt-2 text-3xl font-semibold text-gray-800">{data.title}</h1>
                                <div className="">
                                    <div className="text-center">
                                        <div>
                                            <p className="mt-2 text-gray-600 text-xl">Creator Name: {data.name}</p>
                                            <p className="mt-2 text-xl text-gray-600">Creator Email: {data.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-lg font-bold text-gray-600">Payable Amount: {data.amount}</p>
                            </div>
                            <div className='text-center'>
                                <form onSubmit={handleSubmit}>
                                    <div className='lg:flex justify-center hidden'>
                                        <div>
                                            <label className='font-bold' htmlFor="submission_details">Submission Details:</label>
                                            <br />
                                            <textarea
                                                rows={3}
                                                cols={100}
                                                className='bg-gray-200 border-2 border-gray-900 rounded-xl'
                                                id="submission_details"
                                                required
                                                placeholder="Submission Details"
                                                value={submissionDetails}
                                                onChange={(e) => setSubmissionDetails(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className='flex lg:hidden'>
                                        <label className='font-bold' htmlFor="submission_details"></label>
                                        <br />
                                        <textarea
                                            rows={2}
                                            className='bg-gray-200 ml-14 border-2 border-gray-900 rounded-xl'
                                            id="submission_details"
                                            required
                                            placeholder="Submission Details"
                                            value={submissionDetails}
                                            onChange={(e) => setSubmissionDetails(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <button className='btn w-full bg-[#5d386f] text-xl text-[#ACC7B4]' type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDetails;
