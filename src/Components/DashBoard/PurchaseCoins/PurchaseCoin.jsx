import { Link } from "react-router-dom";

const PurchaseCoin = () => {
  const array = [
    { price: 1, coins: 10 },
    { price: 9, coins: 100 },
    { price: 19, coins: 500 },
    { price: 39, coins: 1000 },
  ];

  return (
    <div className="lg:pr-10 lg:pl-10 lg:pb-10 ">
        <h1 className="text-4xl text-center font-semibold">Purchase Coins</h1>
      {array.map((item, index) => (
        <div key={index} className="border-2 rounded-xl border-gray-950 mt-5 text-[#e1f3e6] bg-[#af6dd0] p-4  text-center">
          <p className=" h-20 w-full mt-5 lg:text-3xl  ">
            {item.coins} coins = ${item.price}
          </p>
       
          <Link
           
            item={item}
            to={`/dashboard/payment/${item.price}`}
            className="btn w-full bg-[#743f8f] hover:bg-gray-500  lg:text-xl btn-primary"
          >
            Buy Now
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PurchaseCoin;
