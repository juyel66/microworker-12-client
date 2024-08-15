import  { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Home/useAuth";
import { Player } from "@lottiefiles/react-lottie-player";
import userAxiosPublic from "../../Hook/userAxiosPublic";
import Swal from "sweetalert2";

const WithDrawals = ({ workerEmail }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [coins, setCoins] = useState(0);
  const [maxWithdrawAmount, setMaxWithdrawAmount] = useState(15);
  const watchWithdrawCoins = watch("withdrawCoins", 0);
  const { user } = useAuth();
  const axiosPublic = userAxiosPublic();
  console.log(coins)

  useEffect(() => {
    // Mock API call to fetch submissions
    const fetchSubmissions = async () => {
      // Replace this with your actual API call
      const submissionsData = [
        { workerEmail: "worker@example.com", coins: 300 },
      ];
      const workerSubmissions = submissionsData.filter(
        (submission) => submission.workerEmail === workerEmail
      );
      if (workerSubmissions.length > 0) {
        setCoins(workerSubmissions[0].coins);
        setMaxWithdrawAmount(workerSubmissions[0].coins / 20);
      }
    };

    fetchSubmissions();
  }, [workerEmail]);

  const onSubmit = async (data) => {
    const withdrawAmount = data.withdrawCoins / 20;
    if (withdrawAmount > maxWithdrawAmount) {
      alert("The amount is greater than the maximum withdraw amount.");
      return;
    }
    // Prepare withdrawal data
    const currentDate = new Date().toLocaleString({ timeZone: "Asia/Dhaka" });
    const withdrawalData = {
      worker_email: user?.email,
      worker_name: user?.displayName, // Replace with actual worker name
      withdraw_coin: parseInt(data.withdrawCoins),
      withdraw_amount: withdrawAmount,
      payment_system: data.paymentSystem,
      account_number: parseInt(data.accountNumber),
      withdraw_time: currentDate,
    };
    console.log("Withdrawal Data:", withdrawalData);

    try {
      // Insert the withdrawalData into your database
      const response = await axiosPublic.post('/withdraw', withdrawalData);
      console.log("Response:", response.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Withdraw ",
        showConfirmButton: false,
        timer: 1500
      });
      
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
      alert("There was an error submitting your withdrawal request. Please try again.");
    }
  };

  return (
    <div>
      <div className="lg:flex items-center pl-10 pr-5 mt-28">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center text-2xl mb-10 font-semibold">
            Maximum Withdrawal Amount: ${maxWithdrawAmount.toFixed(2)}
          </h2>
          <div className="flex gap-2">
            <label>
              Coin To Withdraw:
              <input
                type="number"
                placeholder="Withdraw Coins"
                {...register("withdrawCoins", { required: true, min: 1 })}
                className="input border-2 border-[#331B3F] input-bordered w-full"
              />
              {errors.withdrawCoins && (
                <span className="text-red-700">
                  Coin amount is required and must be at least 1
                </span>
              )}
              <br />
            </label>
            <label>
              Withdraw Amount:
              <input
                type="text"
                value={(watchWithdrawCoins / 20).toFixed(2)}
                readOnly
                className="input border-2 border-[#331B3F] input-bordered w-full"
              />
            </label>
          </div>
          <div>
            <label>
              Account Number:
              <input
                type="text"
                placeholder="+8801700000000"
                className="input border-2 border-[#331B3F] input-bordered w-full"
                {...register("accountNumber", { required: true, maxLength: 14 })}
              />
              {errors.accountNumber && (
                <span className="text-red-700">
                  Account number is required and must be exactly 14 characters long
                </span>
              )}
            </label>
            <label>
              Select Payment System:
              <select
                className="input border-2 border-[#331B3F] input-bordered w-full"
                {...register("paymentSystem", { required: true })}
              >
                <option value="">Select</option>
                <option value="Bkash">Bkash</option>
                <option value="Rocket">Rocket</option>
                <option value="Nagad">Nagad</option>
              </select>
              {errors.paymentSystem && (
                <span className="text-red-700">Payment system is required</span>
              )}
              <br />
            </label>
          </div>
          <button
            type="submit"
            className="btn bg-[#623d75] mt-5 lg:w-full text-white lg:text-xl"
          >
            Withdraw
          </button>
        </form>
        <div>
          <div className="lg:flex justify-center">
            <div className="flex-1 lg:hidden">
              <Player
                autoplay
                loop
                src="https://lottie.host/30512cc1-22d8-443e-8ba4-99d43f2a9660/3jthq9v4Qt.json"
                style={{ height: "300px", width: "200px" }}
              ></Player>
            </div>
            <div className="lg:flex hidden">
              <Player
                autoplay
                loop
                src="https://lottie.host/30512cc1-22d8-443e-8ba4-99d43f2a9660/3jthq9v4Qt.json"
                style={{ height: "400px", width: "600px" }}
              ></Player>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithDrawals;
