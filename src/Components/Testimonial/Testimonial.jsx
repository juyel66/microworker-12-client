import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
// import { Typewriter } from "react-simple-typewriter";

const Testimonial = () => {
  const earners = [
    {
      name: "Md Juyel Rana",
      earnings: "$500 in 2 months",
      description:
        "Alim uses his free time to earn money on our micro-earning platform, helping to cover extra family expenses.",
      imageUrl: "https://i.ibb.co/DwT8JQr/IMG-20240227-133443-01-Copy-01.jpg", // Replace with actual image URL
    },
    {
      name: "Sumi Akter",
      earnings: "$300 in 1 months",
      description:
        "Sumi earns money to cover her educational expenses and shares her experience of how she manages to earn her pocket money by working on the platform.",
      imageUrl: "https://i.ibb.co/zHRp56N/7fe82a74c85afb551a0cabb7708cac83.jpg", // Replace with actual image URL
    },
    {
      name: "Rakib Hasan",
      earnings: "$1,200 in 1 year",
      description:
        "Rakib, a college student, uses the platform to cover his personal expenses and save for the future while continuing his studies.",
      imageUrl: "https://i.ibb.co/dmj8Yd9/download-67.jpg", // Replace with actual image URL
    },
    {
      name: "Tania Rahman",
      earnings: "$800 in 9 months",
      description:
        "Tania, a homemaker, utilizes her free time to earn extra income on our platform, contributing to her family’s finances.",
      imageUrl: "https://i.ibb.co/gd3N6PK/images-41.jpg", // Replace with actual image URL
    },
    {
      name: "Mizanur Rahman",
      earnings: "$450 in 4 months",
      description:
        "Mizanur has used his earnings from the platform to fund his small business and is planning to expand it further.",
      imageUrl: "https://i.ibb.co/QrDQt0m/images-43.jpg", // Replace with actual image URL
    },
    {
      name: "Fahima Khatun",
      earnings: "$200 in 2 months",
      description:
        "Fahima is new to our platform but has already managed to cover her minor expenses with her earnings and expresses gratitude for the opportunities provided.",
      imageUrl: "https://i.ibb.co/zHRp56N/7fe82a74c85afb551a0cabb7708cac83.jpg", // Replace with actual image URL
    },
  ];

  return (
    <div>
        <h1 className="text-3xl text-center mb-4 mt-10 font-semibold">Earner Success Stories</h1>
      <>
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          // earners
        >
          {

            earners.map((earner) => <SwiperSlide key={earner.index}>
                
                <SwiperSlide className="rounded-xl">
              <div
                className="hero bg-[#4d2a5e]   h-[44vh]"
               
              >
                <div className="hero-overlay bg-[#8f58a2] border-2 border-[#3e1a51] text-[#ceedd8] bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="">
                    <div className="flex justify-center">
                    <img className="lg:h-28 lg:w-28 h-20 w-20 rounded-full  object-cover  border-2 border-[#3e1a51]" src={earner.imageUrl} alt="" />
                    </div>
                    <h1 className=" lg:text-3xl text-2xl text-[#ceedd8] font-semibold">
                    {earner.name}
                    </h1>
                    {/* <h1>Bangladesh</h1> */}
                    <p className=" text-[#ceedd8] text-xl lg:w-[700px] mx-auto">
                        {earner.description}
                    </p>
                    <p className=" text-[#ceedd8]  font-bold">{earner.earnings}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>


            </SwiperSlide>)
            
            }
        </Swiper>
      </>
    </div>
  );
};

export default Testimonial;
