import AOS from "aos";
import "aos/dist/aos.css";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import carLottie from "../../../assets/carLottie.json";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import useCurrentUser from "../../../Hooks/useCurrentUser/useCurrentUser";
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";
import SingleListing from "../../../components/SingleListing/SingleListing";

const MyListings = () => {
  // hooks and custom hooks
  const axiosSecure = useAxiosSecure();
  const { dbCurrentUserPending, dbCurrentUser } = useCurrentUser();
  const userEmail = dbCurrentUser?.email;

  // data fetching
  const {
    isPending: userListingsPending,
    data: userListings,
    refetch: listingsRefetch,
  } = useQuery({
    queryKey: ["user-listing", userEmail],
    enabled: !dbCurrentUserPending,
    queryFn: async () => {
      const res = await axiosSecure.get(`/listings/${userEmail}`);
      return res.data;
    },
  });

  // conditional loading
  if (userListingsPending) {
    return <LoadingAnimation />;
  }

  // animation
  AOS.init({
    offset: 120,
    duration: 1500,
    easing: "ease",
    delay: 50,
  });

  return (
    <div className="flex flex-col justify-start items-center w-full h-full">
      <h2
        className="text-center text-4xl md:text-5xl font-bold text-main  capitalize"
        data-aos="slide-right"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-bottom"
      >
        My Listings
      </h2>

      {/* show user listings */}
      {userListings.length === 0 ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Lottie animationData={carLottie} />
          <h3 className="text-4xl font-bold text-lightBlack text-center">
            No data found!
          </h3>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-[80px]">
          {userListings?.map((singleList, index) => (
            <SingleListing
              key={index}
              singleList={singleList}
              listingsRefetch={listingsRefetch}
            ></SingleListing>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
