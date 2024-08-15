import { Swiper, SwiperSlide } from "swiper/react";
import { Typewriter } from "react-simple-typewriter";
import {
  Navigation,
  Pagination,
  A11y,
  EffectFade,
  Autoplay,
} from "swiper/modules";

import "swiper/swiper-bundle.css";

const SwiperSlider = () => {
    return (
        <div className="text-[#743f8f]">
             <div className=" mb-10">
        <div>
          <Swiper
            modules={[Navigation, Pagination, A11y, EffectFade, Autoplay]}
            effect="fade"
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            <SwiperSlide className="rounded-xl">
              <div
                className="hero  h-[60vh]"
                style={{
                  backgroundImage: "url(https://i.ibb.co/NjFZjVW/download-65.jpg)",
                }}
              >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="">
                    <h1 className="mb-5 lg:text-5xl text-2xl font-bold">
                      <Typewriter 
                        words={["Amazon Mechanical Turk (MTurk)"]}
                        loop={5}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                      />
                    </h1>
                    {/* <h1>Bangladesh</h1> */}
                    <p className="mb-5 text-xl lg:w-[700px] mx-auto">
                    A marketplace for micro-tasks where workers complete simple tasks like surveys, data entry, and content moderation for pay.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide className="">
              <div
                className="hero  h-[60vh]"
                style={{
                  backgroundImage: "url(https://i.ibb.co/6nNhYbx/download-66.jpg)",
                }}
              >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="">
                    <h1 className="mb-5 lg:text-5xl text-2xl font-bold">
                      <Typewriter
                        words={[
                          "Figure Eight (formerly CrowdFlower)",
                        ]}
                        loop={5}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                      />
                    </h1>

                    {/* <h1>Thailand</h1> */}
                    <p className="mb-5 text-xl lg:w-[700px] mx-auto">
                      {" "}
                      A human-in-the-loop platform involving data enrichment, transcription, categorization, and other micro-tasks to enhance machine learning models used by various businesses.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="">
              <div
                className="hero  h-[60vh]"
                style={{
                  backgroundImage: "url(https://i.ibb.co/hshg1GJ/download-5.jpg)",
                }}
              >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                  <div className="">
                    <h1 className="mb-5 lg:text-5xl text-2xl font-bold">
                      <Typewriter
                        words={[
                          "Figure Eight (formerly CrowdFlower)",
                        ]}
                        loop={5}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                      />
                    </h1>

                    {/* <h1>Thailand</h1> */}
                    <p className="mb-5 text-xl lg:w-[700px] mx-auto">
                      {" "}
                      Perform data enrichment, transcription, and categorization tasks to help improve machine learning models.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>

         
          </Swiper>
        </div>
      </div>
            
        </div>
    );
};

export default SwiperSlider;