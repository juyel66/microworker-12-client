
import { BsSubstack } from "react-icons/bs";
import { FaAd, FaHome, FaList, FaTasks, FaUser } from "react-icons/fa";
import { MdAttachMoney, MdHistory } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
// import useUserData from "./useUserData/useUserData";
import Footer from "../Footer/Footer";
import DashboardNavbar from "./DashboardNavbar/DashboardNavbar";
import { useEffect } from "react";
import useUserData from "./useUserData/useUserData";

const DashBoard = () => {
  const [workerData] = useUserData();

  useEffect(() => {
    console.log(workerData.role);
  }, [workerData]);
  

  return (
    <div>
      <div className="flex ">
        <div className="w-64 lg:flex hidden  min-h-screen text-[#ACC7B4] bg-[#331B3F]">
          <ul className="menu">

            {workerData.role === "admin" && (
              
              <>
                {/* Admin */}
                <img className="w-20 lg:ml-10 h-20 rounded-full" src="https://i.ibb.co/bmy5cnX/jrrrr.png" alt="" />
                <div className="">
                
                <p className="lg:text-2xl font-bold text-xl lg:ml-10">
                  Admin
                </p>
                </div>
                <li>
                  <NavLink to="/dashboard/AdminHome">
                    <FaHome></FaHome> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageUser">
                    <FaUser></FaUser> Manage User
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageTask">
                    <FaTasks></FaTasks> Manage Task
                  </NavLink>
                </li>
              </>

             )} 

            {workerData.role === "worker" && (
              <>
                {/* Worker */}
                <img className="w-20 lg:ml-10 h-20 rounded-full" src="https://i.ibb.co/bmy5cnX/jrrrr.png" alt="" />
                <li className="lg:text-2xl text-xl font-bold lg:ml-10">
                  Worker
                </li>
                <li>
                  <NavLink to="/dashboard/workerHome">
                    <FaHome></FaHome> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/taskList">
                    <FaList></FaList> Task List
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/mySubmissions">
                    <BsSubstack /> My Submissions
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/withdrawals">
                    <BsSubstack /> Withdrawals
                  </NavLink>
                </li>
              </>

             )} 

            {workerData.role === "taskCreator" && (
              <>
                {/* Task Creator */}
                <img className="w-20 lg:ml-10 h-20 rounded-full" src="https://i.ibb.co/bmy5cnX/jrrrr.png" alt="" />
                <li className="lg:text-2xl font-bold text-xl lg:ml-10">
                  Task Creator
                </li>
                <li>
                  <NavLink to="/dashboard/TaskCreatorHome">
                    <FaHome></FaHome> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addNewTask">
                    <FaAd></FaAd> Add new tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myTasks">
                    <FaTasks></FaTasks> My Task’s
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/purchaseCoin">
                    <MdAttachMoney /> Purchase Coin
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/paymentHistory">
                    <MdHistory />
                    Payment history
                  </NavLink>
                </li>
              </>


              
           )} 
           {/* <div className="divider"></div>
           <li>
                  <NavLink to="/">
                    <MdHistory />
                    Home
                  </NavLink>
                </li> */}

          </ul>
          
        </div>
        
        
        <div className="flex-1 bg-[#e3bef5]">
        <div className=""><DashboardNavbar></DashboardNavbar></div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoard;

