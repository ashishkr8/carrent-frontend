import "./css//Home.css";
import Location from "../molecules/Homepage/Location";
import About from "../molecules/Homepage/About";
import PopularCars from "../molecules/Homepage/PopularCars";
import Feedback from "../molecules/Homepage/Feedback";
import FAQ from "../molecules/Homepage/FAQ";
import Filter from "../molecules/Homepage/Filter";

const Home = () => {
  return (
      <main id="homepage">
        <Filter />
        {/* Popular Cars */}
        <PopularCars />

        {/* Section About us */}

        <About />

        {/* Section Maps */}
        <Location />

        {/* Recent Feedback */}
        <Feedback />

        {/* FAQ */}
        <FAQ />
      </main>
  );
};

export default Home;
