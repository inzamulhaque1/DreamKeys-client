import Advertisement from "./Advertisement";
import BlogSection from "./BlogSection";
import FAQSection from "./FAQSection";
import Hero from "./Hero";
import LatestReviews from "./LatestReviews";
import Slider from "./Slider";


const Home = () => {
  return (
    <div>
        <Hero></Hero>
        <Advertisement></Advertisement>
        <Slider></Slider>
        <LatestReviews></LatestReviews>
        <BlogSection></BlogSection>
        <FAQSection></FAQSection>
        
       
      
    </div>
  );
};

export default Home;
