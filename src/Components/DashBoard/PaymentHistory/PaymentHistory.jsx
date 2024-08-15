// import { useState, useEffect } from "react";
// import userAxiosPublic from "../../Hook/userAxiosPublic";
// import { Player } from "@lottiefiles/react-lottie-player";
// import useAuth from "../../Home/useAuth";

// const PaymentHistory = () => {
//   const [payments, setPayments] = useState([]);
//   const axiosPublic = userAxiosPublic();
//   const {user} = useAuth() // Replace this with the actual user's email

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const res = await axiosPublic.get(`/payment/${user?.email}`);
//         setPayments(res.data);
//       } catch (error) {
//         console.error("Error fetching payment data", error);
//       }
//     };

//     fetchPayments();
//   }, [axiosPublic,user?.email]);
  
//   console.log("Your payment history", payments);

//   return (
//     <div className="p-3">
//       <p className="text-3xl text-center font-semibold mt-4">
//         Your Payment History: {payments?.length}
//       </p>
//       <div>
//         {payments?.length > 0 ? (
//           <div className="mt-4 mb-4 overflow-x-auto">
//             <table className="table">
//               <thead>
//                 <tr className="lg:text-xl border-2 bg-gray-200 border-green-500">
//                   <th>No</th>
//                   <th>Email</th>
//                   <th>Transaction ID</th>
//                   <th>Date</th>
//                   <th>Amount</th>
//                   {/* <th>Status</th> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {payments?.map((payment, index) => (
//                   <tr className="border-2 border-green-500" key={payment._id}>
//                     <td>{index + 1}</td>
//                     <td className="py-2 px-4 border-b">{payment.email}</td>
//                     <td className="py-2 px-4 border-b">{payment.transactionId}</td>
//                     <td className="py-2 px-4 border-b">{payment.date}</td>
//                     <td className="py-2 px-4 border-b">{payment.price}$</td>
//                     {/* <td className="py-2 px-4 border-b">{payment.status}</td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div>
//             <p className="text-center mt-5">No payment history available.</p>

//             <div className="lg:flex justify-center">
//               <div className="flex-1 lg:hidden">
//                 <Player
//                   autoplay
//                   loop
//                   src="https://lottie.host/d53b7a3a-8883-4460-9f16-387491682f1b/1mS2ZVJ0Zj.json"
//                   style={{ height: "300px", width: "200px" }}
//                 ></Player>
//               </div>

//               <div className="lg:flex hidden">
//                 <Player
//                   autoplay
//                   loop
//                   src="https://lottie.host/d53b7a3a-8883-4460-9f16-387491682f1b/1mS2ZVJ0Zj.json"
//                   style={{ height: "500px", width: "600px" }}
//                 ></Player>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentHistory;










import { useState, useEffect } from "react";
import userAxiosPublic from "../../Hook/userAxiosPublic";
import { Player } from "@lottiefiles/react-lottie-player";
import useAuth from "../../Home/useAuth";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const axiosPublic = userAxiosPublic();
  const { user } = useAuth(); // Replace this with the actual user's email

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosPublic.get(`/payment/${user?.email}`);
        setPayments(res.data);
      } catch (error) {
        console.error("Error fetching payment data", error);
      }
    };

    fetchPayments();
  }, [axiosPublic, user?.email]);

  // Calculate the total amount using reduce method
   const totalAmount = payments.reduce((sum, payment) => sum + payment.price, 0);

  console.log("Your payment history", payments);

  return (
    <div  className="p-3">
      <p className="text-3xl text-center font-semibold mt-4">
        Your Payment History: {payments?.length}
      </p>
      <p className="text-xl text-center font-semibold mt-2">
        Total Amount: ${totalAmount.toFixed(2)}
      </p>
      <div>
        {payments?.length > 0 ? (
          <div className="mt-4 mb-4 overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="lg:text-xl border-2 border-[#4a275c]">
                  <th>No</th>
                  <th>Email</th>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  {/* <th>Status</th> */}
                </tr>
              </thead>
              <tbody>
                {payments?.map((payment, index) => (
                  <tr className="border-2 border-[#743f8f]" key={payment._id}>
                    <td>{index + 1}</td>
                    <td className="py-2 px-4 border-b">{payment.email}</td>
                    <td className="py-2 px-4 border-b">{payment.transactionId}</td>
                    <td className="py-2 px-4 border-b">{payment.date}</td>
                    <td className="py-2 px-4 border-b">{payment.price}$</td>
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
  );
};

export default PaymentHistory;
