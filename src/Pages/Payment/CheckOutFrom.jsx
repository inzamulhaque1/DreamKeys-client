import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import useAuth from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";




const CheckOutFrom = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const location = useLocation();
  const { bidId, offerAmount } = location.state || {};
  console.log(bidId, offerAmount)

  
  const {user} = useAuth()
  const totalPrice = 500 ; // it will be dynamic 


 

  useEffect(() => {

    if(totalPrice > 0){
        axiosSecure.post("/create-payment-intent", {price: totalPrice,})
    .then(res => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
    })
    }

  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");

    }

    // confirm payment

    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })

    if (confirmError) {
        console.log('confirm error')
    } else {
        console.log('payment intent',paymentIntent)
        if(paymentIntent.status === 'succeeded'){
            console.log('transaction id', paymentIntent.id)
            setTransactionId(paymentIntent.id)

            // now save the data in the database
            const payment = {
                email: user.email,
                price: totalPrice, 
                transactionId: paymentIntent.id,
                date: new Date(),

                status: 'pending'
            }

            const res = await axiosSecure.post('/payments', payment)
            console.log('payment saves', res.data)
            

        }

    }



    console.log(stripe , clientSecret);










  };

  return (
    <form onSubmit={handleSubmit}>
        <p>PAY NOW : {totalPrice}</p>
      <CardElement
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

      
      <button
        className="btn btn-primary btn-sm my-4"
        type="submit"
        disabled={!stripe || !clientSecret }
      >
        Pay
      </button>
      <p className="text-red-500 text-sm"> {error}</p>
      {
        transactionId && <p className="text-green-500 text-sm">Your transaction ID: {transactionId}</p>
      }
    </form>
  );
};

export default CheckOutFrom;
