import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../PurchaseCoins/CheckOutForm/CheckOutForm";
import { useParams } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
// import CheckOutForm from "./CheckOutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  const { amount } = useParams();
  const coin = parseFloat(amount);

  return (
    <div className="lg:flex">


    <div className="flex-1 lg:mt-40">
        
    <div className="lg:p-20 p-10">
    <p className="text-3xl font-semibold  ">Payment now</p>
        <Elements stripe={stripePromise}>
          <CheckOutForm price={coin}></CheckOutForm>
        </Elements>
      </div>
    </div>


    <div>

<div className="flex-1 lg:hidden">
    <Player
      autoplay
      loop
      src="https://lottie.host/e1c36f61-2c4a-4657-bb17-75c9ff55ce0c/qfaXkpRTUd.json"
      style={{ height: "300px", width: "200px" }}
    ></Player>
  </div>

     <div className="lg:flex hidden">
    <Player
      autoplay
      loop
      src="https://lottie.host/e1c36f61-2c4a-4657-bb17-75c9ff55ce0c/qfaXkpRTUd.json"
      style={{ height: "600px", width: "600px" }}
    ></Player>
  </div>

</div>



    </div>
  );
};

export default Payment;
