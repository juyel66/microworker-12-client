import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
// import useAxiosSecure from "../../../Hook/useAxiosSecure";
// import Swal from "sweetalert2";
import userAxiosPublic from "../../../Hook/userAxiosPublic";
import Swal from "sweetalert2";

const UpdateTask = () => {
    const axiosPublic = userAxiosPublic();
    const navigate = useNavigate()

    const { title, SubmissionInfo, details, _id } = useLoaderData();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const details = form.details.value;
        const SubmissionInfo = form.SubmissionInfo.value;
        const allInfo = { title, details, SubmissionInfo };
        console.table(allInfo);

        try {
            const res = await axiosPublic.patch(`/tasks/${_id}`, allInfo);
            console.log(res.data);
            // Uncomment the following block if you want to show a success message using SweetAlert
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: 'Task is updated',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/myTasks')
            }
        } catch (error) {
            console.error("Error updating task:", error);
            // Optionally, you can show an error message using SweetAlert
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: 'Failed to update task',
                showConfirmButton: true,
            });
        }
    };

    return (
        <div>
            <div>
                <p className="text-4xl text-center font-bold mt-5">Update Task</p>
                <div className="lg:p-10 mt-8 ">
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-3">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Task Title</span>
                                </div>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={title}
                                    placeholder="Task Title"
                                    className="input border-2 border-[#331B3F] input-bordered w-full"
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Task Details</span>
                                </div>
                                <input
                                    type="text"
                                    name="details"
                                    defaultValue={details}
                                    placeholder="Task Details"
                                    className="input border-2 border-[#331B3F] input-bordered w-full"
                                />
                            </label>
                        </div>
                        <label className="form-control  w-full">
                            <div className="label">
                                <span className="label-text">Submission info</span>
                            </div>
                            <input
                                type="text"
                                name="SubmissionInfo"
                                placeholder="Submission info"
                                defaultValue={SubmissionInfo}
                                className="input border-2 border-[#331B3F] input-bordered w-full"
                            />
                        </label>
                        <button className="btn bg-[#5a346c] mt-3 lg:w-full text-white lg:text-xl">
                            Update Item <MdOutlineSystemUpdateAlt />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateTask;
