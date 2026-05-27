import { Outlet, useLocation, Link } from "react-router-dom";
import logo from "../assets/cognigate_logo_3.png";
import Navbar from "@/components/layout/Navbar";

function AuthLayout() {
    const location = useLocation();
    const isLogin = location.pathname.includes("login");
    const isForgotPassword = location.pathname.includes("forgot-password");
    const isLeftForm = isLogin || isForgotPassword;

    return (
        <div
            className="min-h-screen bg-white relative flex lg:block overflow-hidden">

            {/* LEFT SIDE - BRANDING & INFO */}
            <div
                className={`
                hidden lg:flex flex-col justify-between bg-slate-950 relative overflow-hidden px-12 py-16
                lg:absolute lg:top-0 lg:bottom-0 lg:w-1/2 lg:transition-transform lg:duration-[800ms] lg:ease-in-out lg:z-20
                ${isLeftForm ? 'lg:translate-x-full' : 'lg:translate-x-0'}
            `}>
                {/* Animated Background Gradients */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                {/* Top Logo */}
                <div className="relative z-10">
                    <Link to="/" className="inline-flex items-center gap-3 group">
                        <img src={logo} alt="Cognigate Logo" className="w-12 h-12 rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300" />
                        <span className="text-white text-2xl font-bold tracking-tight">Cognigate</span>
                    </Link>
                </div>

                {/* Main Dynamic Content */}
                <div className="relative z-10 max-w-lg mb-24 mt-12">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
                        {isForgotPassword ? "Account Recovery" : (isLogin ? "Welcome Back" : "Start Your Journey")}
                    </div>
                    <h1 className="text-5xl font-extrabold text-white mb-6 leading-[1.15]">
                        {isForgotPassword ? "Get back on track." : (isLogin ? "Resume your preparation." : "Master technical interviews with AI.")}
                    </h1>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        {isForgotPassword
                            ? "Don't worry, it happens to the best of us. Reset your password to regain access to your dashboard and continue your technical preparation journey."
                            : (isLogin
                                ? "Pick up right where you left off. Review your past performances, tackle new challenges, and continue honing your technical skills."
                                : "Simulate real-world technical interviews with our adaptive AI. Get instant, actionable feedback and land your dream job.")}
                    </p>
                </div>

                {/* Bottom Testimonial */}
                <div className="relative z-10">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
                        <div className="flex gap-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-slate-300 italic text-sm leading-relaxed">
                            "Cognigate completely changed how I prepare for system design and coding interviews. The AI feedback is incredibly precise and helped me land offers at FAANG."
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                SJ
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-sm">Sarah Jenkins</h4>
                                <p className="text-slate-400 text-xs">Software Engineer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div
                className={`
                flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white relative
                lg:absolute lg:top-0 lg:bottom-0 lg:w-1/2 lg:overflow-y-auto lg:transition-transform lg:duration-[800ms] lg:ease-in-out lg:z-10
                ${isLeftForm ? 'lg:translate-x-0' : 'lg:translate-x-full'}
            `}>
                {/* Mobile Header */}
                <div className="lg:hidden block">
                    <Navbar />
                </div>

                {/* The Form Outlet */}
                <div className="mx-auto w-full max-w-sm sm:max-w-md mt-32 lg:mt-0 relative z-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;