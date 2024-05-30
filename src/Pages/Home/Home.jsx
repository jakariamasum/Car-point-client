import About from "./About";
import Banner from "./Banner";
import FeaturedCar from "./FeaturedCar";
import Newsletter from "./NewsLetter";
import UserActivity from "./UserActivity";

const Home = () => {
  return (
    <div>
      <Banner />
      <UserActivity />
      <About />
      <FeaturedCar />
      <Newsletter />
    </div>
  );
};

export default Home;
