import React from 'react';

const OurMission = () => {
    return (
        <div className=" whitebg flex flex-col items-center px-4 py-16">

            {/* Heading + Description */}
            <div className="max-w-4xl text-center">
                <h1 className="text-4xl font-bold text-green-500 mb-6">Our Mission</h1>
                <p className="text-lg text-secondary leading-relaxed mb-10">
                    At <span className="font-semibold text-green-500">BookCourier</span>, our mission is to make
                    knowledge more accessible by offering convenient library-to-home delivery services.
                    We help students, researchers, and book lovers borrow and return books without
                    visiting the library in person. By bridging the gap between readers and libraries,
                    we aim to promote continuous learning, improve reading habits, and ensure that
                    educational resources are available to everyone—anytime, anywhere.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mt-10 w-full">

                <div className="bg-gray-100 shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition">
                    <h3 className="text-3xl font-bold text-green-500 mb-4">3,200+</h3>
                    <p className="text-gray-600">Books Delivered</p>
                </div>

                <div className="bg-gray-100 shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition">
                    <h3 className="text-3xl font-bold text-green-500 mb-4">900+</h3>
                    <p className="text-gray-600">Active Readers</p>
                </div>

                <div className="bg-gray-100 shadow-md rounded-2xl p-8 text-center hover:shadow-lg transition">
                    <h3 className="text-3xl font-bold text-green-500 mb-4">45+</h3>
                    <p className="text-gray-600">Partner Libraries</p>
                </div>

            </div>

            {/* Final Message */}
            <div className="max-w-3xl mt-16 text-center">
                <p className="text-lg text-secondary leading-relaxed">
                    Together, we are building a smarter and more connected community—one book at a time.
                    BookCourier is not just a service; it's a step toward a future where learning has
                    no limits and libraries are accessible to everyone.
                </p>
            </div>

        </div>
    );
};

export default OurMission;
