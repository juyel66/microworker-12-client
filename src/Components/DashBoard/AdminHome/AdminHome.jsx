import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Player } from "@lottiefiles/react-lottie-player";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: withdrawData,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["withdraw"],
    queryFn: async () => {
      const res = await axiosSecure.get("/withdraw");
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: Unable to fetch data</p>;

  console.log(withdrawData);

  // payment success and delete from withdrawal collection 


  const handleDelete = (withdrawData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Payment success ?",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/withdraw/${withdrawData._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "Successful",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };



  return (
    <div>
      <h1 className="text-3xl text-center mt-3">
        Total Withdraw Request: {withdrawData?.length}
      </h1>
      <div className="p-5">
        <div>
          {withdrawData?.length > 0 ? (
            <div className="mt-4 mb-4 overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="lg:text-xl border-2 border-green-500">
                    <th>No</th>
                    <th>Worker name</th>
                    <th>Withdraw Coin</th>
                    <th>Withdrawal amount</th>
                    <th>Payment Number</th>
                    <th>Payment System</th>
                    <th>Withdraw time</th>
                    <th>Success</th>
                    {/* <th>Status</th> */}
                  </tr>
                </thead>
                <tbody>
                  {withdrawData?.map((withdraw, index) => (
                    <tr
                      className="border-2 border-green-500"
                      key={withdraw._id}
                    >
                      <td>{index + 1}</td>
                      <td className="py-2 px-4 border-b">
                        {withdraw.worker_name}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {withdraw.withdraw_coin}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {withdraw.withdraw_amount}$
                      </td>
                      <td className="py-2 px-4 border-b">
                        +{withdraw.account_number}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {withdraw.payment_system}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {withdraw.withdraw_time}
                      </td>
                      <th onClick={() => handleDelete(withdraw)} className="py-2 px-4 border-b text-3xl btn opacity-70 hover:text-red-500"><GiConfirmed /></th>
                      {/* <td className="py-2 px-4 border-b">{payment.status}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <p className="text-center mt-5">No payment history available.</p>

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
    </div>
  );
};

export default AdminHome;
