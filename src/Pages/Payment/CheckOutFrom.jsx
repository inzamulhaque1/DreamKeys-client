import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import useAuth from "../../hooks/useAuth";
import {  useParams } from "react-router-dom";




const CheckOutFrom = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [property, setProperty] = useState(null);


  const {user} = useAuth()
  
  const { id } = useParams();



  useEffect(() => {


    axiosSecure
    .get(`/get-bid/${id}`)
    .then((response) => {
      setProperty(response.data);

      console.log(response.data);



      if(response.data?.offerAmount > 0){
        axiosSecure.post("/create-payment-intent", {price: response.data?.offerAmount})

        
       
    .then(res => {
       
        setClientSecret(res.data.clientSecret)
    })
    }
      
      
    })
    .catch((error) => {
      console.error("Error fetching property details:", error);
      
    });






  }, [axiosSecure, id]);

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
      ;
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
            
            setTransactionId(paymentIntent.id)

            // now save the data in the database
            const payment = {
                BuyerName: user?.buyerName,
                email: user.email,
                price: property?.offerAmount, 
                transactionId: paymentIntent.id,
                date: new Date(),
                agentEmail: property.agentEmail,
                propertyTitle: property.propertyTitle,
                bidId: property._id

                
            }

            console.log(payment);

            const res = await axiosSecure.post('/payments', payment)
            console.log('payment saves', res.data)


            
            

        }

    }



   










  };

  return (
    <form onSubmit={handleSubmit}>
        <p>PAY NOW : {property?.offerAmount}</p>
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
