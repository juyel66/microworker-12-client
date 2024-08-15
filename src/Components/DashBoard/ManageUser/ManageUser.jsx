import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { AiTwotoneDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data.filter(
        (user) => user.role === "worker" || user.role === "taskCreator" || user.role === 'admin'
      ); // Filter only workers and task creators
    },
  });

  // console.log('manage user data', users);

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
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

  const handleRoleChange = (user, newRole) => {
    axiosSecure.patch(`/users/${user._id}`, { role: newRole }).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "User role has been updated.",
          icon: "success",
        });
        refetch();
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl text-center mt-5 font-semibold">
        Total user: {users.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="lg:text-xl">
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Coin</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}  > 
                <th>{index + 1} </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img className="border-2 border-gray-700"
                          src={item.photoURL}
                          alt=""
                        />
                        
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td className="lg:text-xl">{item.email}</td>
                <td className="lg:text-xl">{item.coin}</td>
                
                <td>
                  <select
                    value={item.role} 
                    onChange={(e) => handleRoleChange(item, e.target.value)}
                    className="select border-2 border-[#331B3F] select-bordered w-full max-w-xs"
                  >
                    <option value="admin">Admin</option>
                    <option value="taskCreator">Task-Creator</option>
                    <option value="worker">Worker</option>
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => handleDeleteUser(item)}
                    className="btn btn-xl bg-gray-200 hover:bg-red-500 text-2xl"
                  >
                    <AiTwotoneDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
