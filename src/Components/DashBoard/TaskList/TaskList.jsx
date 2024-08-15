// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import userAxiosPublic from "../../Hook/userAxiosPublic";

import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../../Hook/userAxiosPublic";
import { Link } from "react-router-dom";

// const TaskList = () => {
//     const axiosPublic = userAxiosPublic();
//     const { data } = useQuery({
//         queryKey: ['data'],
//         queryFn: async () =>{
//             const res = await axiosPublic.get('/addTask')
//             return res.data;
//         }
//     })
//     console.log(data)

//     return (
//         <div >
//              <div>
//             <p className="text-3xl text-center mt-5 font-bold">All Task: {data.length}</p>
//             <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-5">
//                 {
//                     data.map(item =>          <div className="" key={item._id} >
//                         <div className="card border-2 border-gray-900  card-compact bg-base-100 shadow-xl">
//            <figure></figure>
//            <p className="bg-slate-900 absolute right-0 text-white px-4 mt-4 mr-4">$ {item.amount}</p>

//            <div className="card-body">
//              <p className="text-3xl text-center ">{item.name}</p>
//              <h2 className="text-center">{item.title}</h2>
//              <h2 className="text-center">Task Quantity: {item.quantity}</h2>
//              <h2 className="text-center font-bold">Completion date: {item.completionDate}</h2>

//              <div className="card-actions justify-center">
//                <Link to={`/taskDetails/:${item._id}`} className="btn text-[#809f38] lg:w-[180px] border-b-[7px] btn-outline text-xl">View Details</Link>
//              </div>
//            </div>
//             </div>

//                  </div>)
//                 }

//             </div>

//         </div>

//         </div>
//     );
// };

// export default TaskList;

const TaskList = () => {
  const axiosPublic = userAxiosPublic();
  const { data } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await axiosPublic.get("/addTask");
      return res.data;
    },
  });
  console.log(data);
  return (
    <div>
      <p className="text-3xl text-center mt-5 font-bold">
        All Task: {data?.length}{" "}
      </p>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-4 gap-5">
        {data?.map((item) => (
          <div className="" key={item._id}>
            <div className="card border-2 border-gray-900  card-compact bg-base-100 shadow-xl">
              <figure></figure>
              <p className="bg-slate-900 absolute right-0 text-white px-4 mt-4 mr-4">
                $ {item.amount}
              </p>

              <div className="card-body">
                <p className="text-3xl text-center ">{item.name}</p>
                <h2 className="text-center">{item.title}</h2>
                <h2 className="text-center">Task Quantity: {item.quantity}</h2>
                <h2 className="text-center font-bold">
                  Completion date: {item.completionDate}
                </h2>

                <div className="card-actions justify-center">
                  <Link
                    // to={`dashboard/taskDetails/${item._id}`}
                    to={`/dashboard/taskDetails/${item._id}`}
                    className="btn text-[#331B3F] lg:w-[180px] border-b-[7px] btn-outline text-xl"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
