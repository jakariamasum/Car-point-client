import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const BlogCard = ({ img, title, desc, date }) => {
  return (
    <div className="flex flex-col gap-4 bg-white relative shadow-2xl rounded-lg">
      <img
        src={img}
        alt=""
        className="w-full md:w-[400px]  hover:scale-105 rounded-sm"
      />
      <div className="flex gap-1 items-center absolute bottom-72 md:bottom-60 left-12 bg-[#FF7425] px-2 py-1 rounded-lg text-white">
        {" "}
        <FaCalendarAlt /> {date}
      </div>
      <div className="flex flex-col gap-4 px-5">
        <h2 className="text-2xl text-[#232323] font-bold cursor-pointer hover:text-[#FF7425]">
          {title}
        </h2>
        <p className="w-full md:w-[350px]">{desc}</p>
        <Link to="#">
          <p className="cursor-pointer flex gap-2 items-center font-bold hover:text-[#FF7425] pb-8">
            Read More <FaArrowRight />{" "}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
