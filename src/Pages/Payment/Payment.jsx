import { loadStripe } from "@stripe/stripe-js";
import {Elements} from '@stripe/react-stripe-js';
import CheckOutFrom from "./CheckOutFrom";

// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
console.log(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {

  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutFrom></CheckOutFrom>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
