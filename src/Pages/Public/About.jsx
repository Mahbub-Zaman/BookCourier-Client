import React from "react";
import {
  FaBook,
  FaTruck,
  FaUsers,
  FaBullseye,
  FaEye,
  FaClock,
  FaUserCheck,
} from "react-icons/fa";
import { MdLibraryBooks, MdSecurity } from "react-icons/md";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
} from "react-icons/si";

const About = () => {
  return (
    <section className="bg-base-100 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* ================= Hero Section ================= */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About BookCourier</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            BookCourier is a modern library-to-home delivery platform designed
            to make books more accessible, convenient, and user-friendly for
            everyone.
          </p>
        </div>

        {/* ================= Mission & Vision ================= */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-8 rounded-2xl shadow-lg border hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <FaBullseye className="text-3xl text-primary" />
              <h2 className="text-2xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to simplify library access by enabling users to
              browse, borrow, and receive books at their doorstep. We aim to
              reduce physical barriers and promote reading among students,
              researchers, and book lovers.
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-lg border hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <FaEye className="text-3xl text-primary" />
              <h2 className="text-2xl font-semibold">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We envision a future where libraries are digitally connected,
              easily accessible, and seamlessly integrated into daily life,
              making knowledge available anytime and anywhere.
            </p>
          </div>
        </div>

        {/* ================= Features ================= */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">
            What BookCourier Offers
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaBook />}
              title="Browse Books"
              text="Explore books from nearby libraries with detailed information."
            />
            <FeatureCard
              icon={<FaTruck />}
              title="Home Delivery"
              text="Get books delivered directly to your doorstep."
            />
            <FeatureCard
              icon={<MdLibraryBooks />}
              title="Pickup & Return"
              text="Schedule flexible pickup and return times."
            />
            <FeatureCard
              icon={<FaClock />}
              title="Real-Time Tracking"
              text="Track request status, delivery progress, and return deadlines."
            />
            <FeatureCard
              icon={<FaUserCheck />}
              title="Verified Libraries"
              text="Borrow books only from trusted and verified library partners."
            />
            <FeatureCard
              icon={<MdSecurity />}
              title="Secure System"
              text="JWT-based authentication ensures user data safety."
            />
          </div>
        </div>

        {/* ================= Tech Stack ================= */}
        <div className="bg-base-200 rounded-2xl p-10">
          <h2 className="text-3xl font-bold text-center mb-10">
            Technology Stack
          </h2>

          <div className="flex flex-wrap justify-center gap-10 text-center">
            <TechItem icon={<SiReact />} name="React.js" />
            <TechItem icon={<SiNodedotjs />} name="Node.js" />
            <TechItem icon={<SiExpress />} name="Express.js" />
            <TechItem icon={<SiMongodb />} name="MongoDB" />
          </div>
        </div>

        {/* ================= Team Section ================= */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">
            Meet the Team
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <TeamCard
              name="Mahbub Zaman"
              role="Full Stack Developer"
              image="https://i.ibb.co/2d4YyQX/user.png"
            />
            <TeamCard
              name="Team Member"
              role="Frontend Developer"
              image="https://i.ibb.co/2d4YyQX/user.png"
            />
            <TeamCard
              name="Team Member"
              role="Backend Developer"
              image="https://i.ibb.co/2d4YyQX/user.png"
            />
          </div>
        </div>
        
        <div className="bg-base-200 rounded-2xl p-10 text-center space-y-6">
        <FaUsers className="text-5xl mx-auto text-primary" />

        <h2 className="text-3xl font-bold">
            Empowering Access to Knowledge
        </h2>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            BookCourier is more than just a software project. It represents a vision
            where libraries become more accessible, knowledge travels beyond physical
            walls, and readers can explore books without limitations.
        </p>

        <p className="text-gray-600 max-w-3xl mx-auto">
            By combining modern web technologies with a user-centered design,
            BookCourier bridges the gap between libraries and readers, making borrowing
            books easier, smarter, and more convenient than ever before.
        </p>

        <div className="flex justify-center gap-4 pt-4">
            <button className="btn btn-primary px-8">
            Explore Books
            </button>
            <button className="btn btn-outline px-8">
            Contact Us
            </button>
        </div>
        </div>

      </div>
    </section>
  );
};

/* ================= Reusable Components ================= */

const FeatureCard = ({ icon, title, text }) => (
  <div className="p-6 rounded-xl shadow-md border text-center space-y-4
                  hover:shadow-xl transition duration-300">
    <div className="w-16 h-16 mx-auto flex items-center justify-center
                    rounded-full bg-primary/10 text-primary text-3xl">
      {icon}
    </div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </div>
);

const TechItem = ({ icon, name }) => (
  <div className="flex flex-col items-center gap-3">
    <div className="text-5xl text-primary">{icon}</div>
    <p className="font-medium">{name}</p>
  </div>
);

const TeamCard = ({ name, role, image }) => (
  <div className="rounded-2xl shadow-lg border p-6 text-center
                  hover:shadow-xl transition">
    <img
      src={image}
      alt={name}
      className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
    />
    <h3 className="text-xl font-semibold">{name}</h3>
    <p className="text-gray-600">{role}</p>
  </div>
);

export default About;
