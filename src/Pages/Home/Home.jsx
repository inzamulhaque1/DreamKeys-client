import Advertisement from "./Advertisement";
import BlogSection from "./BlogSection";
import FAQSection from "./FAQSection";
import Hero from "./Hero";
import LatestReviews from "./LatestReviews";
import PropertyDemandHeatmap from "./PropertyDemandHeatmap";
import PropertyPriceRange from "./PropertyPriceRange";
import PropertyValuationTool from "./PropertyValuationTool";
import Slider from "./Slider";


const Home = () => {
  return (
    <div className="dark:bg-[#0B0716] bg-gray-50">
        <Hero></Hero>
        <Advertisement></Advertisement>
        <Slider></Slider>
        <PropertyPriceRange></PropertyPriceRange>
        <LatestReviews></LatestReviews>
        <PropertyDemandHeatmap></PropertyDemandHeatmap>
        <PropertyValuationTool></PropertyValuationTool>
        <BlogSection></BlogSection>
        <FAQSection></FAQSection>
        
       
      
    </div>
  );
};

export default Home;
