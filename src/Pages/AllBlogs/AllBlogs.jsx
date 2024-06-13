import BlogCard from "../../components/BlogCard/BlogCard";
import img1 from "../../assets/service.jpg";
const AllBlogs = () => {
  const blogs = [
    {
      img: img1,
      title: "Understanding Engine Oil Grades",
      desc: "Learn about different types of engine oil grades and which one is best suited for your car.",
      date: "June 1, 2024",
    },
    {
      img: img1,
      title: "Brake Maintenance Tips Every Driver Should Know",
      desc: "Discover essential brake maintenance tips to ensure your brakes are in top condition.",
      date: "June 5, 2024",
    },
    {
      img: img1,
      title: "Common Car Electrical Issues and How to Fix Them",
      desc: "Identify common electrical problems in cars and how to troubleshoot and fix them.",
      date: "June 10, 2024",
    },
    {
      img: img1,
      title: "Guide to Choosing the Right Tires for Your Vehicle",
      desc: "Find out how to select the best tires for your car based on driving conditions and preferences.",
      date: "June 15, 2024",
    },
    {
      img: img1,
      title: "Importance of Regular Car Servicing",
      desc: "Learn why regular servicing is crucial for maintaining the performance and longevity of your car.",
      date: "June 20, 2024",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          img={blog.img}
          title={blog.title}
          desc={blog.desc}
          date={blog.date}
        />
      ))}
    </div>
  );
};

export default AllBlogs;
