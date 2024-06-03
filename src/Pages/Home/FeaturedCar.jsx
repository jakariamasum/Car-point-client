import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import SingleListing from "../../components/SingleListing/SingleListing";

const FeaturedCar = () => {
  const axiosPublic = useAxiosPublic();

  const { isLoading: listingPending, data: listings } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      const res = await axiosPublic.get("/homeListings");
      return res.data;
    },
  });

  useEffect(() => {
    AOS.init({
      offset: 120,
      duration: 1200,
      easing: "ease",
      delay: 50,
    });

    // Cleanup AOS on component unmount
    return () => {
      AOS.refresh();
    };
  }, []);

  console.log(listingPending);
  if (listingPending) {
    return (
      <p className="text-center text-lightBlack capitalize">loading....</p>
    );
  }

  return (
    <div className="mt-[6rem] flex flex-col justify-center items-center gap-4 container mx-auto p-5">
      <h2
        className="text-3xl md:text-5xl capitalize text-main font-semibold text-center"
        data-aos="slide-down"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-bottom"
      >
        Latest Cars
      </h2>
      <p className="text-center text-lightBlack">
        A friendly collection for you. You can have a look and choose the best
        for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 w-full mt-10">
        {listings.map((singleList) => (
          <SingleListing key={singleList._id} singleList={singleList} />
        ))}
      </div>

      <Link to="/allListings">
        <button className="group bg-main px-4 py-3 rounded text-white font-semibold hover:bg-sub duration-500 mt-10 flex justify-center items-center gap-2">
          <span>See More</span>
          <FaArrowRightLong className="hidden group-hover:flex duration-500" />
        </button>
      </Link>
    </div>
  );
};

export default FeaturedCar;