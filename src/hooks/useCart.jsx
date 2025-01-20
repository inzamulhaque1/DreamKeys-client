import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {refetch, data: cart = [] } = useQuery({
    queryKey: ["bids", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bids`);
      return res.data;
    },
  });
  return [cart, refetch];
};

export default useCart;


