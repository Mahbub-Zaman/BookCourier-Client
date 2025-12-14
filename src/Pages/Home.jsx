import React from "react";
import { Link } from "react-router-dom";
import HeroSlider from '../components/Home/HeroSlider';
import HowItWorks from '../components/Home/HowItWorks';
import OurMission from '../components/Home/OurMission';
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Coverage from "../components/Home/coverage";
import LatestBooks from "../components/Home/LatestBooks";

const Home = () => (
  <div>
    <title>BookCourier | Home</title>
    <HeroSlider />
    
    <div className="whitebg py-12">
      <div className=" max-w-7xl mx-auto">
        <LatestBooks />
      </div>
      
      <div className="text-center my-8">
        <Link to="/books">
          <button className="btn btn-primary px-6 py-2 rounded-lg hover:btn-secondary transition">
            Show All Books
          </button>
        </Link>
      </div>
    </div>

    <div className="bg-gray-200 ">
      <Coverage/>
    </div>
    
    <WhyChooseUs />

    <div className="bg-gray-200">
      <HowItWorks />
      <OurMission />
    </div>
  </div>
);

export default Home;
