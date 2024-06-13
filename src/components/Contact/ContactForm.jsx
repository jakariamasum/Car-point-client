const ContactForm = () => {
  return (
    <div className="my-8 md:my-16">
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 justify-center text-center">
          <p className="text-[#FF7425] font-bold">Contact Form</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#232323]">
            Get a Quote
          </h2>
        </div>
      </div>
      <form className="mx-4 md:mx-28 mt-4 md:mt-10">
        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <input
            type="text"
            name=""
            id=""
            placeholder="First Name"
            className="py-3 md:py-4 px-2 md:w-1/2 rounded-sm border border-black w-full"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Last Name"
            className="py-3 md:py-4 px-2 md:w-1/2 rounded-sm border border-black w-full"
          />
        </div>
        <div className="flex flex-col gap-4 my-4 md:my-6 md:flex-row md:gap-4">
          <input
            type="email"
            name=""
            id=""
            placeholder="Email"
            className="py-3 md:py-4 px-2 w-full rounded-sm border border-black"
          />
          <input
            type="number"
            name=""
            id=""
            placeholder="Phone No."
            className="py-3 md:py-4 px-2 w-full rounded-sm border border-black"
          />
        </div>
        <div className="my-4">
          <input
            type="text"
            name=""
            id=""
            placeholder="Subject"
            className="py-3 md:py-4 px-2 w-full rounded-sm border border-black"
          />
        </div>
        <div className="my-4">
          <textarea
            name=""
            id=""
            cols="5"
            rows="5"
            placeholder="Write comments"
            className="w-full rounded-sm py-3 md:py-6 px-2 md:px-4 border border-black"
          ></textarea>
        </div>
        <div className="text-center my-4 md:my-6">
          <input
            type="submit"
            value="Submit"
            className="bg-[#FF7425] px-4 md:px-8 rounded-lg text-white cursor-pointer py-3 md:py-4"
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
