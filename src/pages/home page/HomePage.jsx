import Banner from "./Banner";
import HowItWorks from "../../components/HowItWorks";
import WhyChooseUs from "../../components/WhyChooseUs";
import SpecialOffer from "../../components/HomeComponent/SpecialOffer";
import CustomerTestimonial from "./CustomerTestimonial";

import { Helmet } from "react-helmet-async";
import TopCars from "./TopCars";

const HomePage = () => {
    return (
        <div>
            <Helmet>
                <title>GoWheels</title>
            </Helmet>
            <Banner></Banner>
            
            <div className="max-w-7xl mx-auto">
                <TopCars></TopCars>
                <HowItWorks></HowItWorks>
                <WhyChooseUs></WhyChooseUs>
                <SpecialOffer></SpecialOffer>
                <CustomerTestimonial></CustomerTestimonial>
            </div>
        </div>
    );
};

export default HomePage;
