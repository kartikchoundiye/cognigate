// function HomePage() {
// return ( <div>HomePage</div>
// );
// }

// export default HomePage;




import { Link } from "react-router-dom";

function HomePage() {

    return (
        <div className="pt-36">

            {/* HERO SECTION */}

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

        </div>
    );
}

export default HomePage;