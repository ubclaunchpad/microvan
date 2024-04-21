import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const navigate = useNavigate();

  const handleContactUsButton = () => {
    navigate("/contact");
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full h-[326px] bg-footer flex flex-col items-center">
      <div className="w-[85%] h-full text-footer-foreground justify-between flex items-start pt-[43px]">
        <div className="flex flex-col">
          <div className="flex flex-col mb-[30px] gap-y-[4px]">
            <h3 className="text-2xl font-medium">Still have questions?</h3>
            <p className="text-base font-normal">We&apos;re here to help.</p>
          </div>
          <div className="mb-[55px] w-[80%]">
            <Button variant="footer" className="px-[72.5px] py-[30px]" onClick={handleContactUsButton}>
              <p className="text-sm font-medium">Contact Us</p>
            </Button>
          </div>
          <p className="text-base font-normal">© Microvan Inc. 2024</p>
        </div>
        <div className="flex flex-col w-[30%]">
          <h3 className="text-base font-semibold">Our Hours:</h3>
          <div className="flex flex-col">
            {[
              { day: "Monday", hours: "8am-5pm" },
              { day: "Tuesday", hours: "8am-5pm" },
              { day: "Wednesday", hours: "8am-5pm" },
              { day: "Thursday", hours: "8am-5pm" },
              { day: "Friday", hours: "8am-5:30pm" },
              { day: "Saturday", hours: "8am-4pm" },
              { day: "Sunday", hours: "Closed" },
            ].map((schedule) => (
              <div key={schedule.day} className="flex gap-x-10">
                <p className="text-base font-normal flex-1 text-left pr-4">{schedule.day}</p>
                <p className="text-base font-normal flex-1">{schedule.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

