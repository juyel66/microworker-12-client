import { SiGoogletasks } from "react-icons/si";
import register from '../../assets/edit.png'
import { MdOutlinePayment } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";

const HowItsWork = () => {
  return (
   <div>
    <div className="text-center mb-5">
    <h1 className="text-3xl font-bold"> How it Works</h1>
    <p className="text-xl">Follow these simple steps to start earning rewards.</p>
    </div>
     <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">

        
      <div>
        <div className=" bg-[#331B3F] shadow-xl  w-full border-2 h-[320px] border-gray-300 rounded-xl hover:bg-[#743f8f]">
          <div className="card-body">
            <div className="flex justify-center  mb-2 text-7xl">
              <img className="w-28 h-28" src={register} alt="" />
            </div>
            <h2 className=" text-center font-semibold text-2xl">
            Sign Up
            </h2>
            <p className="text-center">
            Users register on the platform, providing basic information such as email, username, and sometimes demographic details.
            </p>
          </div>
        </div>
      </div>
     


      <div>
        <div className=" bg-[#331B3F] shadow-xl   w-full border-2 h-[320px] border-gray-300 rounded-xl hover:bg-[#743f8f]">
          <div className="card-body">
            <div className="flex justify-center  mb-2 text-7xl">
            <MdOutlinePayment />
            </div>
            <h2 className=" text-center font-semibold text-2xl">
            Completion and Payment
            </h2>
            <p className="text-center">
            Users complete selected tasks according to instructions provided. Upon task approval by the platform or requester, earnings are credited to the users account, often redeemable via PayPal
            </p>
          </div>
        </div>
      </div>





      <div>
        <div className="  bg-[#331B3F] shadow-xl  w-full border-2 h-[320px] border-gray-300 rounded-xl hover:bg-[#743f8f]">
          <div className="card-body">
            <div className="flex justify-center  mb-2 text-7xl">
            <VscTasklist />
            </div>
            <h2 className=" text-center font-semibold text-2xl">
            Task Selection
            </h2>
            <p className="text-center">
            Users browse available tasks categorized by type (e.g., surveys, data entry, testing) and choose tasks that match their interests or skills.
            </p>
          </div>
        </div>
      </div>

    </div>
   </div>
  );
};

export default HowItsWork;
