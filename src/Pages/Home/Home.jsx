import About from "./About";
import Banner from "./Banner";
import Newsletter from "./NewsLetter";
import UserActivity from "./UserActivity";

const Home = () => {
  return (
    <div>
      <Banner />
      <UserActivity />
      <About />
      <Newsletter />
    </div>
  );
};

export default Home;
