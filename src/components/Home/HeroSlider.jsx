import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const HeroSlider = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/books'); // logged in, go to books page
    } else {
      navigate('/login'); // not logged in, go to login
    }
  };

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      pagination={{ clickable: true }}
      className="w-full h-[50vh] md:h-[80vh]"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="relative w-full h-full">
          <img
            src="/banner1.jpg"
            alt="Slide 1"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
            <h2 className="text-3xl md:text-6xl font-bold mb-4">Welcome to BookCourier</h2>
            <p className="text-base md:text-xl">Your library books delivered safely to your doorstep.</p>
            <button
              onClick={handleGetStarted}
              className="mt-6 px-6 py-3 btn-primary bg-purple-600 rounded-lg hover:bg-purple-700 transition"
            >
              Browse Books
            </button>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="relative w-full h-full">
          <img
            src="/banner2.jpg"
            alt="Slide 2"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
            <h2 className="text-3xl md:text-6xl font-bold mb-4">Borrow Books Without Visiting</h2>
            <p className="text-base md:text-xl">Request pickups and deliveries directly from nearby libraries.</p>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide>
        <div className="relative w-full h-full">
          <img
            src="/banner3.jpg"
            alt="Slide 3"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
            <h2 className="text-3xl md:text-6xl font-bold mb-4">Seamless Book Delivery Experience</h2>
            <p className="text-base md:text-xl">From borrowing to returning—everything handled with ease.</p>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 4 */}
      <SwiperSlide>
        <div className="relative w-full h-full">
          <img
            src="/banner4.jpg"
            alt="Slide 4"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
            <h2 className="text-3xl md:text-6xl font-bold mb-4">Connecting Readers & Libraries</h2>
            <p className="text-base md:text-xl">Helping students and researchers access knowledge anytime.</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
