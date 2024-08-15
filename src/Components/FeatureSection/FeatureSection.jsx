import { BsCoin } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { SiGoogletasks } from "react-icons/si";

const FeatureSection = () => {
  return (
    <div>
   <div className="text-center">
   <h1 className="text-3xl  font-bold">
        Explore Our Core Features
      </h1>
      <p className="text-xl">Experience seamless sign-up, a variety of micro-tasks, and reliable payments, all designed to offer <br /> you a flexible and rewarding earning opportunity.</p>
   </div>

      <div className="grid lg:grid-cols-3     md:grid-cols-2 grid-cols-1 gap-7 mt-2 mb-10 p-2">
      <div>
        <div className=" bg-[#331B3F] w-full shadow-xl border-2 h-[300px] border-gray-300 rounded-xl hover:bg-[#743f8f]">
          <div className="card-body">
            <div className="flex justify-center mb-2 text-7xl"><BsCoin ></BsCoin></div>
            <h2 className=" text-center font-semibold text-2xl">Earn Coins by Completing Tasks</h2>
            <p className="text-center">Complete tasks and earn coins as rewards. Coins can be redeemed for various benefits and prizes, providing an engaging and motivating experience for users</p>
           
          </div>
        </div>
      </div>

      <div>
        <div className="  bg-[#331B3F] shadow-xl  w-full border-2 h-[300px] border-gray-300 rounded-xl hover:bg-[#743f8f]">
          <div className="card-body">
            <div className="flex justify-center mb-2 text-7xl"><SiGoogletasks /></div>
            <h2 className=" text-center font-semibold text-2xl">Create and Manage Tasks</h2>
            <p className="text-center">Easily create and manage tasks with a user-friendly interface. Organize your to-do lists, set deadlines, and prioritize tasks to boost productivity and stay on track.</p>
           
          </div>
        </div>
      </div>

      <div>
        <div className="  bg-[#331B3F] shadow-xl  w-full border-2 h-[300px] border-gray-300 rounded-xl hover:bg-[#743f8f]">
          <div className="card-body">
            <div className="flex justify-center mb-2 text-7xl"><MdOutlinePayments /></div>
            <h2 className=" text-center font-semibold text-2xl">Secure Payments</h2>
            <p className="text-center">Ensure all transactions are safe and secure. Our platform uses advanced encryption and security protocols to protect your payment information, providing peace of mind for all users.

</p>
           
          </div>
        </div>
      </div>
      </div>

    </div>
  );
};

export default FeatureSection;
