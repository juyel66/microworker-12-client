import { Link, NavLink } from "react-router-dom";
import useAuth from "../Home/useAuth";
import { LiaCoinsSolid } from "react-icons/lia";
import useUserData from "../DashBoard/useUserData/useUserData";
import { useEffect, useState } from "react";


const Navbar = () => {
  const {user, logOut} = useAuth();
  const [workerData] = useUserData();
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'yellow';
  });
  const handleLogout = () =>{
    logOut()
    .then(result =>{
      console.log(result?.user);
    })
    .catch(error=>{
      console.error(error);
    })
  }


  const links = (
    <>
     <li><NavLink className={({ isActive }) => isActive? "bg-green-500 text-white btn-success text-bold text-[14px]": "text-[14px] font-bold lg:text-white text-black " } to="/" > Home</NavLink>
      </li>
     <li><NavLink className={({ isActive }) => isActive? "bg-gray-500 text-white btn-success text-bold text-[14px]": "text-[14px] font-bold lg:text-white text-black " } to='https://www.youtube.com/watch?v=Dn_QYofxH34' target="_blank" >Watch Demo</NavLink>
      </li>
     { user &&
      <li><NavLink className={({ isActive }) => isActive? "bg-gray-500 text-white btn-success text-bold text-[14px]": "text-[14px] font-bold lg:text-white text-black " } to='/dashboard/welcome'  >Dashboard</NavLink>
      </li>
      }
   
    </>
  )
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };


    return (
        <div className="">
            <div className="navbar rounded-xl fixed z-10 bg-opacity-55 h-5 bg-[#331B3F] text-white container mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {links}
        <a onClick={handleLogout} className=" btn btn-sm">Log Out</a>
      </ul>
    </div>
    <a className="btn btn-ghost lg:text-xl">Microworkers</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {links}
    </ul>
  </div>
  <div className="navbar-end">
 {
  user &&
  <div className="flex items-center mr-4 ">
  <p><LiaCoinsSolid className="text-3xl text-yellow-400"/></p>
  <p className="lg:text-2xl flex">  <span className="lg:flex hidden">Coin:</span> {workerData.coin}</p>
  </div>
 }

    <div>
   

      {
        user && <img className="w-10 h-10 rounded-full mr-2" src={user?.photoURL} alt="" />
      }
     

    </div>

    <div className="mr-2">
<label className="cursor-pointer grid place-items-center">
            <input
              onChange={handleToggle}
              type="checkbox"
              checked={theme === 'dark'}
              className="toggle lg:w-[70px] h-8 theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
            />
            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </label>
</div>
   {
    user? 
    <a  onClick={handleLogout} className="lg:flex hidden  btn btn-sm">Log Out</a> :
   <div>
     <Link to='/login' className=" btn btn-sm ">Login</Link>
     <Link to='/register' className=" btn btn-sm ml-2">Register</Link>
   </div>
   
   }

  </div>
</div>
            
        </div>
    );
};

export default Navbar;