import { Link } from "react-router-dom"
import heroImage from "../../assets/rabbit-hero.webp"

const Hero = () => {
    return (
        <section className="relative">
            <img src={heroImage} alt="Fashion for men and women" className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center h-full">
                <div className="text-center text-white p-6">
                    <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                        Style for <br /> Him & Her
                    </h1>
                    <p className="text-sm tracking-tighter md:text-lg mb-6">
                        Shop the latest trends in men’s and women’s fashion. Fast global delivery.
                    </p>
                    <Link to="/collections/all" className="bg-white text-gray-950 px-6 py-2 rounded text-lg hover:bg-gray-200 transition">
                        Explore Now
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero
