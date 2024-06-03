import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure/useAxiosSecure";

const useUserBids = (email) => {
  const axiosSecure = useAxiosSecure();

  const { isLoading: bidsPending, data: allBids } = useQuery({
    queryKey: ["all-bids", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/savedAdsList/${email}`);
      return res.data;
    },
  });

  return { bidsPending, allBids };
};

export default useUserBids;
