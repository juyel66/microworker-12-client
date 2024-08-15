import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Home/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useNavigate } from "react-router-dom";
// import userAxiosPublic from "../../../Hook/userAxiosPublic";

const CheckOutForm = ({ price }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // const axiosPublic = userAxiosPublic();
    const navigate = useNavigate()
    

    const totalPrice = price;

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log('Client Secret:', res?.data?.clientSecret);
                    setClientSecret(res?.data?.clientSecret);
                })
                .catch(error => {
                    console.error('Error creating payment intent:', error);
                    setError('Error creating payment intent');
                });
        }

    }, [axiosSecure, totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (paymentMethodError) {
            console.log('Payment method error:', paymentMethodError);
            setError(paymentMethodError.message);
        } else {
            console.log('Payment method:', paymentMethod);
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('Confirm error:', confirmError);
            setError(confirmError.message);
        } else {
            console.log('Payment Intent:', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction ID:', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const currentDate = new Date().toLocaleString({ timeZone: 'Asia/Dhaka' });
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: currentDate,
                    status: 'pending'
                    
                    
                };
                console.log(payment);

                try {
                    const res = await axiosSecure.post('/payment', payment);
                    console.log('Payment saved:', res);

                    if(res){
                        
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: `${price}$ Purchase Successful`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/dashboard/paymentHistory')
                    }
                } catch (dbError) {
                    console.error('Error saving payment to database:', dbError);
                    setError('Error saving payment to database');
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-10">
            <CardElement className="border-2 border-gray-700  p-5 text-red-600 rounded-xl"
                options={{
                    style: {
                        
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <button className="btn  mt-2 text-white text-xl bg-[#743f8f]" type="submit">
                Pay now
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"><span className="font-bold">Your Transaction id:</span> <span>{transactionId}</span></p>}
        </form>
    );
};

export default CheckOutForm;
