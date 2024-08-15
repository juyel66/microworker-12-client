import FeatureSection from "../FeatureSection/FeatureSection";
import HowItsWork from "../HowItsWork/HowItsWork";
import SwiperSlider from "../SwiperSlider/SwiperSlider";
import Testimonial from "../Testimonial/Testimonial";
import TopEarners from "../TopEarners/TopEarners";

const Home = () => {
  return (
    <div className="bg-[#685173] text-[#ACC7B4]"> 
        <SwiperSlider></SwiperSlider>
        <FeatureSection></FeatureSection>
        <HowItsWork></HowItsWork>
        <TopEarners></TopEarners>
        <Testimonial></Testimonial>
        
     
    </div>
  );
};

export default Home;
