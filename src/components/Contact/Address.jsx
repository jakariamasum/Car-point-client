import { FaClock, FaEnvelopeOpen, FaMap } from "react-icons/fa";

const Address = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-[#232628] px-6 md:px-10 lg:px-28 py-8 md:py-12 lg:py-16 text-white">
      <div className="flex items-center gap-4 md:gap-6">
        <FaMap
          size={60}
          fill="white"
          className="bg-[#FF7425] p-4 md:p-5 rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-[#FF7425] text-lg md:text-xl">
            Office Address
          </h2>
          <div className="flex flex-col gap-1">
            <p>380 St Kilda Road,</p>
            <p>Melbourne VIC 3004, Australia</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <FaClock
          size={60}
          fill="white"
          className="bg-[#FF7425] p-4 md:p-5 rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-[#FF7425] text-lg md:text-xl">
            Working Hours
          </h2>
          <div className="flex flex-col gap-1">
            <p>Monday to Friday 09:00 to 18:30</p>
            <p>Saturday 15:30</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <FaEnvelopeOpen
          size={60}
          fill="white"
          className="bg-[#FF7425] p-4 md:p-5 rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-[#FF7425] text-lg md:text-xl">
            Message Us
          </h2>
          <div className="flex flex-col gap-1">
            <p>support@example.com</p>
            <p>info@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
