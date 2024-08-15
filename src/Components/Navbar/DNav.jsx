import { Link, NavLink } from "react-router-dom";
import useAuth from "../Home/useAuth";


const DNav = () => {
  const {user, logOut} = useAuth();
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
     <li><NavLink className={({ isActive }) => isActive? "bg-gray-500 text-white btn-success text-bold text-[14px]": "text-[14px] font-bold lg:text-white text-black " } to='/coming' >Watch Demo</NavLink>
      </li>
     <li><NavLink className={({ isActive }) => isActive? "bg-gray-500 text-white btn-success text-bold text-[14px]": "text-[14px] font-bold lg:text-white text-black " } to='/dashboard/welcome'  >Dashboard</NavLink>
      </li>
   
    </>
  )
    return (
        <div className="">
            <div className="navbar rounded-xl fixed z-10 bg-opacity-55 h-5 bg-black text-white container mx-auto">
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

    <div>

      {
        user && <img className="w-10 h-10 rounded-full mr-2" src={user?.photoURL} alt="" />
      }
     

    </div>
   {
    user? 
    <a onClick={handleLogout} className="lg:flex hidden  btn btn-sm">Log Out</a> :
    <Link to='/register' className=" btn btn-sm">Register</Link>
   
   }

  </div>
</div>
            
        </div>
    );
};

export default DNav;