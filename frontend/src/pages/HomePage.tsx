import { ScrollRestoration } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CoverImage from "@/assets/cover-image.png";
import AboutMeImage from "@/assets/about-me-image.png";

export default function HomePage() {
  return (
    <div className="min-w-screen max-w-screen overflow-x-hidden">
      <ScrollRestoration />
      <div className="relative min-h-screen">
        <div className="top-0 left-0 w-full z-50">
          <NavBar />
        </div>

        <div className="w-full">
          <img
            src={CoverImage}
            alt="Trucks in a row"
            className="absolute top-0 left-0 w-full h-screen object-cover z-[-2]"
          />

          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-[-1]" />

          <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 mx-[55px]">
            <h1 className="text-primary-foreground text-[90px] font-bold">MICROVAN INC.</h1>
            <p className="text-primary-foreground text-[40px] italic font-normal mt-[-10px]">Virtual Auctions</p>
            <p className="text-primary-foreground text-[25px] font-normal leading-relaxed mt-[20px]">
              Providing your trailer & equipment solutions,
              <br /> transported from the heart of the Philippines
            </p>
          </div>

          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 text-center">
            <p className="text-primary-foreground text-[15px] mb-2">scroll down to bid</p>
            <ExpandMoreIcon className="text-primary-foreground animate-bounce" sx={{ fontSize: 46 }} />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center min-h-screen w-full max-w-full text-center z-10">
        <div className="flex items-center justify-center w-[80%] gap-x-4">
          <div className="w-[55%] flex flex-col gap-y-[37px]">
            <h2 className="text-foreground text-xl font-semibold">About Us</h2>
            <p className="text-foreground text-base font-normal">
              Microvan Inc. is your retail solution to vehicle troubles. We host virtual and in-person auctions on
              imported vehicles to companies so that you can cut back on costs. We have vehicles imported from Sweden
              and Japan from major manufacturers such as Toyota and Cat.
              <br />
              <br />
              As of 2024, we now host auctions virtually so that you can place bids from the comfort of your own home.
              Scroll down below to take a look at our auctions.
            </p>
          </div>
          <img src={AboutMeImage} alt="Our mission visual representation" className="max-w-full h-auto" />
        </div>
      </div>

      <div className="w-full items-center mt-[132px]">
        <Footer />
      </div>
    </div>
  );
}
