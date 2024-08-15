import { useEffect } from "react";
import { BsSubstack } from "react-icons/bs";
import { FaAd, FaHome, FaList, FaTasks, FaUser } from "react-icons/fa";
import { MdAttachMoney, MdHistory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useUserData from "../useUserData/useUserData";
import { IoNotifications } from "react-icons/io5";
import useAuth from "../../Home/useAuth";
import { LiaCoinsSolid } from "react-icons/lia";

const DashboardNavbar = () => {
  const [workerData] = useUserData();

  useEffect(() => {
    console.log(workerData.role);
  }, [workerData]);
  const { logOut} = useAuth();
  const handleLogout = () =>{
    logOut()
    .then(result =>{
      console.log(result?.user);
    })
    .catch(error=>{
      console.error(error);
    })
  }
  return (
    <div>
      <div className="navbar bg-[#974abd] text-[#ceedd8]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <h1 className="lg:text-2xl lg:flex hidden font-semibold">Microworker</h1>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <ul className="menu text-[#31a5b6]">
                <p className="text-2xl font-bold">Dashboard</p>

                {workerData.role === "admin" && (
                  <>
                    {/* Admin */}
                    <li className="lg:text-2xl text-[#2f94a4] font-extrabold text-xl lg:ml-10">
                      Admin
                    </li>
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

                <div className="divider"></div>
                
        

                <>
                  <li>
                    <NavLink to="/"> Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/coming">Watch Demo</NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/welcome">Dashboard</NavLink>
                  </li>
                </>
                <div className="divider"> </div>
                <a  onClick={handleLogout} className="  btn btn-sm">Log Out</a>
              </ul>
            </ul>
          </div>
          {/* <h1 className="text-2xl font-semibold">Microworker</h1> */}
          <a className="btn lg:hidden btn-ghost text-xl">
            {workerData.role === "admin" && (
              <>
                <h1>Admin</h1>
              </>
            )}
            {workerData.role === "taskCreator" && (
              <>
                <h1>Task Creator</h1>
              </>
            )}
            {workerData.role === "worker" && (
              <>
                <h1>Worker</h1>
              </>
            )}
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div></div>
          <ul className="menu menu-horizontal px-1">
            {/* <li>
              <a>Item 1</a>
            </li> */}
            {/* <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li> */}
            {/* <li>
              <a>Item 3</a>
            </li> */}
          </ul>
        </div>
       
        <div className="navbar-end ">
        <div className="flex items-center mr-4 ">
        <p><LiaCoinsSolid className="text-3xl text-yellow-400"/></p>
        <p className="lg:text-2xl flex">  <span className="lg:flex hidden">Coin:</span> {workerData.coin}</p>
        </div>
        <img src={workerData?.photoURL} alt="" className="w-12 h-12 mr-2 rounded-full" />
          <a className="btn ">
            
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="" onClick={()=>document.getElementById('my_modal_3').showModal()}><IoNotifications className="text-3xl " /></button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Notifications</h3>
    <p className="py-4">no any notifications</p>
  </div>
</dialog>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
