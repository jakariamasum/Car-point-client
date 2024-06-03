import About from "./About";
import Banner from "./Banner";
import FeaturedCar from "./FeaturedCar";
import Newsletter from "./NewsLetter";
import Testimonial from "./Testimonial";
import TopBidListings from "./TopBidListings";
import UserActivity from "./UserActivity";

const Home = () => {
  return (
    <div>
      <Banner />
      <UserActivity />
      <About />
      <FeaturedCar />
      <Testimonial />
      <TopBidListings />
      <Newsletter />
    </div>
  );
};

export default Home;
