import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Upload, MessageSquare, TrendingUp, Fingerprint, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import introVideo from "@/assets/cognigate_video.mp4";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function HomePage() {
    const [showVideo, setShowVideo] = useState(true);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const videoRef = useRef(null);

    const handlePlayVideo = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.play();
            setVideoPlaying(true);
        }
    }, []);

    const handleVideoEnded = useCallback(() => {
        setFadeOut(true);
        setTimeout(() => {
            setShowVideo(false);
        }, 1000);
    }, []);

    const handleSkipVideo = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        setFadeOut(true);
        setTimeout(() => {
            setShowVideo(false);
        }, 1000);
    }, []);

    // Scroll to top on mount to prevent browser auto-scroll on refresh
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!showVideo) return;

            if (event.key === "Escape") {
                event.preventDefault();
                handleSkipVideo();
            } else if (!videoPlaying) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handlePlayVideo();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [showVideo, videoPlaying, handlePlayVideo, handleSkipVideo]);

    const whyReasons = [
        {
            icon: Fingerprint,
            title: "Personalized, Not Generic",
            description: "Questions come from YOUR resume — your projects, your tech stack, your experience level. No random question banks.",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            icon: Zap,
            title: "Feels Like a Real Interview",
            description: "Conversational AI that listens, follows up, challenges your answers, and adapts difficulty in real-time — just like a human interviewer.",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600"
        },
        {
            icon: Target,
            title: "Actionable Insights",
            description: "Not just a score — get specific areas to improve, communication feedback, and detailed breakdowns for every answer you give.",
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600"
        }
    ];

    return (
        <div className={showVideo ? "pt-24" : "pt-36"}>

            {/* VIDEO INTRO SECTION (inline, below navbar) */}
            {showVideo && (
                <section
                    className={`
                        relative w-full
                        ${videoPlaying ? "aspect-video sm:aspect-auto min-h-0" : "min-h-[30vh]"} sm:min-h-[70vh] lg:min-h-[85vh]
                        bg-linear-to-b from-gray-950 via-gray-900 to-gray-950
                        flex items-center justify-center
                        overflow-hidden
                        transition-all duration-1000 ease-in-out
                        ${fadeOut ? "opacity-0 max-h-0 min-h-0 py-0" : "opacity-100"}
                    `}
                >

                    {/* VIDEO ELEMENT */}

                    {/* <div className={`
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-full h-auto max-w-full max-h-full aspect-video
                        transition-opacity duration-500
                        ${videoPlaying ? "opacity-100" : "opacity-0 pointer-events-none"}
                    `}>
                        <video
                            ref={videoRef}
                            src={introVideo}
                            onEnded={handleVideoEnded}
                            playsInline
                            className="w-full h-full object-cover"
                        />
                        {videoPlaying && (
                            <div
                                className="absolute bottom-[2%] left-[2%] w-[16%] h-[8%] backdrop-blur-xl bg-black/20 pointer-events-none z-10"
                                style={{
                                    maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
                                    WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)'
                                }}
                            />
                        )}
                    </div> */}

                    <div className={`
                        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-full h-auto max-w-full max-h-full aspect-video
                        transition-opacity duration-500
                        ${videoPlaying ? "opacity-100" : "opacity-0 pointer-events-none"}
                    `}>
                        <video
                            ref={videoRef}
                            src={introVideo}
                            onEnded={handleVideoEnded}
                            playsInline
                            className="w-full h-full object-cover"
                        />
                        {videoPlaying && (
                            <>
                                {/* Gradient vignette to hide watermark and provide contrast */}
                                <div className="absolute bottom-0 left-0 w-[25%] h-[15%] bg-gradient-to-tr from-gray-950 via-gray-950/70 to-transparent pointer-events-none z-10" />
                            </>
                        )}
                    </div>

                    {/* PLAY BUTTON OVERLAY (before video starts) */}
                    {!videoPlaying && (
                        <div
                            className="relative z-10 flex flex-col items-center justify-center gap-6 sm:gap-8 px-6 py-12 sm:py-20"
                        >
                            {/* Background glow effect */}
                            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-blue-600/20 blur-3xl animate-pulse" />

                            {/* Logo / Brand */}
                            <h2 className="relative text-3xl sm:text-5xl font-bold text-white tracking-tight text-center">
                                Cognigate
                            </h2>
                            <p className="relative text-sm sm:text-base text-gray-400 -mt-4 uppercase tracking-widest text-center">
                                Interview Preparation Platform
                            </p>

                            {/* Play Button */}
                            <button
                                onClick={handlePlayVideo}
                                className="
                                    relative group
                                    w-20 h-20 sm:w-24 sm:h-24
                                    rounded-full
                                    bg-white/10 backdrop-blur-md
                                    border border-white/20
                                    flex items-center justify-center
                                    hover:bg-white/20 hover:scale-110
                                    transition-all duration-300
                                    cursor-pointer
                                    shadow-lg shadow-black/30
                                "
                            >
                                <Play
                                    size={32}
                                    className="text-white ml-1 group-hover:scale-110 transition-transform sm:w-10 sm:h-10"
                                />
                            </button>

                            <p className="relative text-xs sm:text-sm text-gray-500 text-center">
                                Watch the intro
                            </p>

                            {/* Skip Button */}
                            <button
                                onClick={handleSkipVideo}
                                className="
                                    relative text-xs sm:text-sm text-gray-600
                                    hover:text-white
                                    transition-colors duration-200
                                    underline underline-offset-4
                                    cursor-pointer
                                "
                            >
                                Skip intro
                            </button>
                        </div>
                    )}

                    {/* SKIP BUTTON (while video is playing) */}
                    {
                        // Commented by agent, reason: Remove skip button while video is playing per user request
                        //                     videoPlaying && (
                        //                         <button
                        //                             onClick={handleSkipVideo}
                        //                             className="
                        //                                 absolute bottom-6 right-6
                        //                                 sm:bottom-8 sm:right-8
                        //                                 z-20
                        //                                 px-5 py-2.5 sm:px-6 sm:py-3
                        //                                 rounded-full
                        //                                 bg-white/10 backdrop-blur-md
                        //                                 border border-white/20
                        //                                 text-white text-xs sm:text-sm font-medium
                        //                                 hover:bg-white/20
                        //                                 transition-all duration-200
                        //                                 cursor-pointer
                        //                             "
                        //                         >
                        //                             Skip
                        //                         </button>
                        //                     )
                        // End commented by agent
                    }
                </section>
            )}

            {/* HERO SECTION */}
            <section className={`max-w-7xl mx-auto px-6 ${showVideo ? "pt-10 md:pt-0" : ""} min-h-[60vh] lg:min-h-[85vh] flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16`}>

                {/* LEFT SIDE */}

                <div className="flex-1">
                    <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                        AI-Powered Interview Preparation Platform
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
                        Master Technical Interviews With AI
                    </h1>

                    <p className="mt-6 md:mt-8 text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
                        Cognigate simulates real technical interviews using conversational AI,
                        resume-aware questioning, adaptive difficulty, and communication analysis.
                    </p>

                    {/* BUTTONS */}

                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/signup"
                            className="bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl text-base md:text-lg font-medium hover:opacity-90 transition text-center"
                        >
                            Start Interview
                        </Link>

                        <Link
                            to="/features"
                            className="border border-gray-300 px-6 py-3 md:px-8 md:py-4 rounded-2xl text-base md:text-lg font-medium hover:bg-gray-100 transition text-center"
                        >
                            Explore Features
                        </Link>
                    </div>
                </div>

                {/* RIGHT SIDE */}

                <div className="flex-1 w-full">
                    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-5 md:p-8">

                        {/* TOP CARD */}

                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Live AI Interview
                                </h3>

                                <p className="text-gray-500 mt-1">
                                    Real-time conversational analysis
                                </p>
                            </div>
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        </div>

                        {/* QUESTION BOX */}

                        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                            <p className="text-gray-500 text-sm mb-2">
                                AI Interviewer
                            </p>

                            <p className="text-gray-900 text-lg leading-relaxed">
                                Explain the difference between REST APIs and WebSockets,
                                and describe where you would use each in a scalable system.
                            </p>

                        </div>

                        {/* ANALYTICS CARDS */}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 rounded-2xl p-5">
                                <p className="text-sm text-gray-500">
                                    Confidence
                                </p>

                                <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                                    92%
                                </h4>
                            </div>

                            <div className="bg-purple-50 rounded-2xl p-5">
                                <p className="text-sm text-gray-500">
                                    Technical Score
                                </p>

                                <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                                    88%
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-16 md:py-28">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
                        Simple 3-Step Process
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                        How It Works
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                        Get interview-ready in three simple steps
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200"></div>

                    {[
                        {
                            step: "01",
                            icon: Upload,
                            title: "Upload Your Resume",
                            description: "Our AI parses and deeply understands your technical background, projects, and experience to create personalized questions.",
                            iconBg: "bg-blue-100",
                            iconColor: "text-blue-600"
                        },
                        {
                            step: "02",
                            icon: MessageSquare,
                            title: "Take AI Interview",
                            description: "Engage in a real-time voice conversation with adaptive AI that asks follow-ups, challenges your answers, and adjusts difficulty.",
                            iconBg: "bg-indigo-100",
                            iconColor: "text-indigo-600"
                        },
                        {
                            step: "03",
                            icon: TrendingUp,
                            title: "Get Detailed Feedback",
                            description: "Receive comprehensive performance scores, communication analysis, and specific improvement tips for each answer.",
                            iconBg: "bg-purple-100",
                            iconColor: "text-purple-600"
                        }
                    ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative text-center"
                            >
                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${item.iconBg} flex items-center justify-center mx-auto mb-6 relative z-10`}>
                                    <Icon className={item.iconColor} size={28} />
                                </div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Step {item.step}</div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xs mx-auto">{item.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* BY THE NUMBERS SECTION */}
            <section className="bg-gray-950 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                            By the Numbers
                        </h2>
                        <p className="mt-4 text-base md:text-lg text-gray-400">
                            Trusted by aspiring engineers preparing for their dream jobs
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {[
                            { number: "50+", label: "Interview Categories" },
                            { number: "10K+", label: "Questions Generated" },
                            { number: "95%", label: "User Satisfaction" },
                            { number: "3x", label: "Faster Prep Time" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-sm md:text-base text-gray-400 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY COGNIGATE SECTION */}
            <section className="py-16 md:py-28 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <div className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-6">
                            What Makes Us Different
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                            Why Cognigate?
                        </h2>
                        <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                            Not just another question bank — a complete interview experience
                        </p>
                    </motion.div>

                    {/* Mobile View: Swiper Carousel */}
                    <div
                        className="block md:hidden why-swiper-container"
                        style={{
                            "--swiper-theme-color": "#4f46e5",
                            "--swiper-pagination-bullet-inactive-color": "#9ca3af",
                            "--swiper-pagination-bullet-inactive-opacity": "0.5",
                            "--swiper-pagination-bullet-size": "8px",
                            "--swiper-pagination-bullet-horizontal-gap": "5px"
                        }}
                    >
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={16}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                el: ".why-swiper-pagination",
                                clickable: true
                            }}
                            className="w-full"
                        >
                            {whyReasons.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <SwiperSlide key={index} className="px-1 py-3">
                                        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 min-h-[220px] flex flex-col justify-between">
                                            <div>
                                                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-5`}>
                                                    <Icon className={item.iconColor} size={24} />
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>

                        {/* Custom pagination container outside the Swiper slider to prevent overlap and clipping */}
                        <div className="why-swiper-pagination !relative !bottom-0 flex justify-center gap-2 mt-6"></div>
                    </div>

                    {/* Desktop View: Grid Layout */}
                    <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-8">
                        {whyReasons.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${item.iconBg} flex items-center justify-center mb-5 md:mb-6`}>
                                        <Icon className={item.iconColor} size={26} />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FINAL CTA SECTION */}
            <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl md:rounded-[2.5rem] p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
                >
                    {/* Background decorative elements */}
                    <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                            Ready to Ace Your Next Interview?
                        </h2>
                        <p className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto mb-8 md:mb-10">
                            Join thousands of engineers who are preparing smarter, not harder.
                            Start your AI-powered mock interview today.
                        </p>
                        <Link
                            to="/signup"
                            className="inline-block bg-white text-blue-700 px-8 py-3.5 md:px-10 md:py-4 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}

export default HomePage;