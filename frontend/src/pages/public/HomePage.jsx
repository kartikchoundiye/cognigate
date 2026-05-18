// Commented by agent, reason: Implementing intro video overlay with Option B (Click to Play with sound)
// // function HomePage() {
// // return ( <div>HomePage</div>
// // );
// // }
// 
// // export default HomePage;
// 
// 
// 
// 
// import { Link } from "react-router-dom";
// 
// function HomePage() {
// 
//     return (
//         <div className="pt-36">
// 
//             {/* HERO SECTION */}
// 
//             <section className="max-w-7xl mx-auto px-6 min-h-[85vh] flex flex-col lg:flex-row items-center justify-between gap-16">
// 
//                 {/* LEFT SIDE */}
// 
//                 <div className="flex-1">
// 
//                     <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
// 
//                         AI-Powered Interview Preparation Platform
// 
//                     </div>
// 
//                     <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
// 
//                         Master Technical Interviews With AI
// 
//                     </h1>
// 
//                     <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-2xl">
// 
//                         Cognigate simulates real technical interviews using conversational AI,
//                         resume-aware questioning, adaptive difficulty, and communication analysis.
// 
//                     </p>
// 
//                     {/* BUTTONS */}
// 
//                     <div className="mt-10 flex flex-col sm:flex-row gap-4">
// 
//                         <Link
//                             to="/signup"
//                             className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-medium hover:opacity-90 transition text-center"
//                         >
//                             Start Interview
//                         </Link>
// 
//                         <Link
//                             to="/features"
//                             className="border border-gray-300 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-gray-100 transition text-center"
//                         >
//                             Explore Features
//                         </Link>
// 
//                     </div>
// 
//                 </div>
// 
//                 {/* RIGHT SIDE */}
// 
//                 <div className="flex-1 w-full">
// 
//                     <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
// 
//                         {/* TOP CARD */}
// 
//                         <div className="flex items-center justify-between mb-8">
// 
//                             <div>
// 
//                                 <h3 className="text-xl font-semibold text-gray-900">
//                                     Live AI Interview
//                                 </h3>
// 
//                                 <p className="text-gray-500 mt-1">
//                                     Real-time conversational analysis
//                                 </p>
// 
//                             </div>
// 
//                             <div className="w-4 h-4 rounded-full bg-green-500"></div>
// 
//                         </div>
// 
//                         {/* QUESTION BOX */}
// 
//                         <div className="bg-gray-50 rounded-2xl p-6 mb-6">
// 
//                             <p className="text-gray-500 text-sm mb-2">
//                                 AI Interviewer
//                             </p>
// 
//                             <p className="text-gray-900 text-lg leading-relaxed">
//                                 Explain the difference between REST APIs and WebSockets,
//                                 and describe where you would use each in a scalable system.
//                             </p>
// 
//                         </div>
// 
//                         {/* ANALYTICS CARDS */}
// 
//                         <div className="grid grid-cols-2 gap-4">
// 
//                             <div className="bg-blue-50 rounded-2xl p-5">
// 
//                                 <p className="text-sm text-gray-500">
//                                     Confidence
//                                 </p>
// 
//                                 <h4 className="text-3xl font-bold text-gray-900 mt-2">
//                                     92%
//                                 </h4>
// 
//                             </div>
// 
//                             <div className="bg-purple-50 rounded-2xl p-5">
// 
//                                 <p className="text-sm text-gray-500">
//                                     Technical Score
//                                 </p>
// 
//                                 <h4 className="text-3xl font-bold text-gray-900 mt-2">
//                                     88%
//                                 </h4>
// 
//                             </div>
// 
//                         </div>
// 
//                     </div>
// 
//                 </div>
// 
//             </section>
// 
//         </div>
//     );
// }
// 
// export default HomePage;
// End commented by agent

// Commented by agent, reason: Changing video from fixed overlay to inline section below navbar, fixing mobile responsiveness and navbar gap
// import { useState, useRef, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { Play } from "lucide-react";
// import introVideo from "@/assets/cognigate_video.mp4";
// 
// function HomePage() {
//     const [showVideo, setShowVideo] = useState(true);
//     const [videoPlaying, setVideoPlaying] = useState(false);
//     const [fadeOut, setFadeOut] = useState(false);
//     const videoRef = useRef(null);
// 
//     const handlePlayVideo = useCallback(() => {
//         if (videoRef.current) {
//             videoRef.current.play();
//             setVideoPlaying(true);
//         }
//     }, []);
// 
//     const handleVideoEnded = useCallback(() => {
//         setFadeOut(true);
//         setTimeout(() => {
//             setShowVideo(false);
//         }, 1000);
//     }, []);
// 
//     const handleSkipVideo = useCallback(() => {
//         if (videoRef.current) {
//             videoRef.current.pause();
//         }
//         setFadeOut(true);
//         setTimeout(() => {
//             setShowVideo(false);
//         }, 1000);
//     }, []);
// 
//     return (
//         <div className="pt-36">
// 
//             {/* VIDEO INTRO OVERLAY */}
//             {showVideo && (
//                 <div
//                     className={`
//                         fixed inset-0 z-9999 bg-black
//                         flex items-center justify-center
//                         transition-opacity duration-1000 ease-in-out
//                         ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}
//                     `}
//                 >
// End commented by agent

import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import introVideo from "@/assets/cognigate_video.mp4";

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

    return (
        <div className={showVideo ? "pt-24" : "pt-36"}>

            {/* VIDEO INTRO SECTION (inline, below navbar) */}
            {showVideo && (
                <section
                    className={`
                        relative w-full
                        min-h-[50vh] sm:min-h-[70vh] lg:min-h-[85vh]
                        bg-linear-to-b from-gray-950 via-gray-900 to-gray-950
                        flex items-center justify-center
                        overflow-hidden
                        transition-all duration-1000 ease-in-out
                        ${fadeOut ? "opacity-0 max-h-0 min-h-0 py-0" : "opacity-100"}
                    `}
                >
                    {/* VIDEO ELEMENT */}
                    <video
                        ref={videoRef}
                        src={introVideo}
                        onEnded={handleVideoEnded}
                        playsInline
                        className={`
                            absolute inset-0 w-full h-full object-contain
                            transition-opacity duration-500
                            ${videoPlaying ? "opacity-100" : "opacity-0"}
                        `}
                    />

                    {/* PLAY BUTTON OVERLAY (before video starts) */}
                    {!videoPlaying && (
                        <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-6 py-20">
                            {/* Background glow effect */}
                            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-blue-600/20 blur-3xl animate-pulse" />

                            {/* Logo / Brand */}
                            <h2 className="relative text-3xl sm:text-5xl font-bold text-white tracking-tight text-center">
                                Cognigate
                            </h2>
                            <p className="relative text-sm sm:text-base text-gray-400 -mt-4 uppercase tracking-widest text-center">
                                AI Interview Platform
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
                    {videoPlaying && (
                        <button
                            onClick={handleSkipVideo}
                            className="
                                absolute bottom-6 right-6
                                sm:bottom-8 sm:right-8
                                z-20
                                px-5 py-2.5 sm:px-6 sm:py-3
                                rounded-full
                                bg-white/10 backdrop-blur-md
                                border border-white/20
                                text-white text-xs sm:text-sm font-medium
                                hover:bg-white/20
                                transition-all duration-200
                                cursor-pointer
                            "
                        >
                            Skip
                        </button>
                    )}
                </section>
            )}

            {/* HERO SECTION */}
            {!showVideo && (
                <section className="max-w-7xl mx-auto px-6 min-h-[85vh] flex flex-col lg:flex-row items-center justify-between gap-16">

                    {/* LEFT SIDE */}

                    <div className="flex-1">

                        <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">

                            AI-Powered Interview Preparation Platform

                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900">

                            Master Technical Interviews With AI

                        </h1>

                        <p className="mt-8 text-lg text-gray-600 leading-relaxed max-w-2xl">

                            Cognigate simulates real technical interviews using conversational AI,
                            resume-aware questioning, adaptive difficulty, and communication analysis.

                        </p>

                        {/* BUTTONS */}

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">

                            <Link
                                to="/signup"
                                className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-medium hover:opacity-90 transition text-center"
                            >
                                Start Interview
                            </Link>

                            <Link
                                to="/features"
                                className="border border-gray-300 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-gray-100 transition text-center"
                            >
                                Explore Features
                            </Link>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}

                    <div className="flex-1 w-full">

                        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">

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

                                    <h4 className="text-3xl font-bold text-gray-900 mt-2">
                                        92%
                                    </h4>

                                </div>

                                <div className="bg-purple-50 rounded-2xl p-5">

                                    <p className="text-sm text-gray-500">
                                        Technical Score
                                    </p>

                                    <h4 className="text-3xl font-bold text-gray-900 mt-2">
                                        88%
                                    </h4>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>
            )}

        </div>
    );
}

export default HomePage;