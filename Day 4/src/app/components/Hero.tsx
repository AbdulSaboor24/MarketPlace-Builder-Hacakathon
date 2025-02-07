const Hero = () => {
    return (
        <div
            className="relative h-[400px] md:h-[600px] bg-cover bg-center flex items-center justify-center text-center text-white"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }} // Replace with your preferred image URL
        >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 px-6 md:px-12 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide leading-tight mb-4 drop-shadow-lg">
                    Discover Your Style
                </h1>
                <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto text-gray-300">
                    Shop the latest trends with our exclusive collection. Elevate your wardrobe with timeless pieces.
                </p>
                <a
                    href="/shop"
                    className="inline-block px-8 py-3 text-lg font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Shop Now
                </a>
            </div>
        </div>
    );
};

export default Hero;  