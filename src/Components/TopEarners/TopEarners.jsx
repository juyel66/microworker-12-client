import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../Hook/userAxiosPublic";

const TopEarners = () => {
  const axiosPublic = userAxiosPublic();
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/user");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sort users by coins in descending order and take the top 6
  const topUsers = users.sort((a, b) => b.coins - a.coins).slice(0, 6);

  console.log('Top users', topUsers);

  return (
    <div>
      <h1 className="text-center text-3xl   font-semibold mt-10 mb-3">Top Earners</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {topUsers.map(user => (
          <div key={user.id} className="card bg-[#331B3F] hover:bg-[#743f8f] border-4 border-green-700 shadow-xl">
            <figure>
              <img className="w-40 p-2 rounded-full h-40" src={user.photoURL} alt='' />
            </figure>
            <div className="card-body">
              <p className="text-2xl text-center font-semibold">{user.name}</p>
              <h2 className="card-title">
                <p className="text-2xl text-center font-semibold bg-[#743f8f] rounded-xl text-white">Earn coin: {user.coin}</p>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEarners;
