import {
    Brain,
    Mic,
    FileText,
    BarChart3,
    ShieldCheck,
    Workflow,
    Smile,
    Sliders,
    Trophy,
    FileSearch,
    Code,
    Users,
    MessageSquarePlus,
    Database,
    ClipboardCheck,
    Gauge,
    PieChart
} from "lucide-react";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MobileFeatureCarousel = ({ features }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleDragEnd = (e, { offset, velocity }) => {
        const swipeThreshold = 50;
        if (offset.x < -swipeThreshold && activeIndex < features.length - 1) {
            setActiveIndex((prev) => prev + 1);
        } else if (offset.x > swipeThreshold && activeIndex > 0) {
            setActiveIndex((prev) => prev - 1);
        }
    };

    return (
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden block md:hidden">
            {features.map((feature, index) => {
                const isActive = index === activeIndex;

                let x = 0;
                let scale = 1;
                let opacity = 1;
                let zIndex = features.length - Math.abs(activeIndex - index);

                if (index === activeIndex) {
                    x = 0;
                    scale = 1;
                    opacity = 1;
                } else if (index === activeIndex - 1) {
                    x = "-75%";
                    scale = 0.85;
                    opacity = 0.5;
                } else if (index === activeIndex + 1) {
                    x = "75%";
                    scale = 0.85;
                    opacity = 0.5;
                } else if (index < activeIndex - 1) {
                    x = "-110%";
                    scale = 0.7;
                    opacity = 0;
                } else if (index > activeIndex + 1) {
                    x = "110%";
                    scale = 0.7;
                    opacity = 0;
                }

                const Icon = feature.icon;

                return (
                    <motion.div
                        key={index}
                        drag={isActive ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        initial={false}
                        animate={{ x, scale, opacity, zIndex }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute w-[75%] max-w-[320px] bg-white rounded-3xl p-8 border border-gray-200 shadow-xl cursor-grab active:cursor-grabbing flex flex-col items-center text-center"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                            <Icon className="text-blue-600" size={28} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-sm line-clamp-4">{feature.description}</p>
                    </motion.div>
                );
            })}

            <div className="absolute bottom-0 flex gap-2">
                {features.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${idx === activeIndex ? "bg-blue-600" : "bg-gray-300"}`}
                    />
                ))}
            </div>
        </div>
    );
};

function FeaturesPage() {

    const features = [
        {
            icon: Brain,
            title: "AI-Powered Interviews",
            description:
                "Conduct intelligent interviews using advanced LLM-based conversational workflows.",
        },
        {
            icon: FileText,
            title: "Resume-Based Questions",
            description:
                "Generate personalized technical and HR questions directly from candidate resumes.",
        },
        {
            icon: Mic,
            title: "Voice Interaction",
            description:
                "Real-time voice communication with speech-to-text and text-to-speech integration.",
        },
        {
            icon: Workflow,
            title: "Multi-Agent AI System",
            description:
                "Specialized AI agents collaborate to simulate realistic recruiter behavior.",
        },
        {
            icon: BarChart3,
            title: "Performance Analytics",
            description:
                "Track interview readiness, communication skills, and technical strengths.",
        },
        {
            icon: ShieldCheck,
            title: "Secure Authentication",
            description:
                "JWT authentication, OTP verification, and protected user workflows.",
        },
        {
            icon: Smile,
            title: "Behavioral Profiling",
            description:
                "Analyze tone, confidence, and soft skills using advanced sentiment analysis.",
        },
        {
            icon: Sliders,
            title: "Custom Interview Scenarios",
            description:
                "Create tailored environments, from high-pressure startup tests to corporate screening.",
        },
        {
            icon: Trophy,
            title: "Peer Benchmarking",
            description:
                "Compare performance scores against industry standards and other candidates.",
        },
    ];

    return (
        <div className="bg-[#F7F9FC] min-h-screen pt-20">

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 pt-10 pb-14 md:pb-16 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-6">
                    Next-Generation AI Preparation
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight md:leading-tight">
                    Master Every Interview <br className="hidden md:block" /> with Intelligent AI
                </h1>

                <p className="mt-4 md:mt-6 text-sm md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Elevate your career using conversational AI and multi-agent workflows.
                    Experience realistic, resume-aware mock interviews designed to build your
                    confidence and help you land your dream job.
                </p>
            </section>

            {/* FEATURES GRID */}

            <section className="max-w-7xl mx-auto px-6 pb-20">
                <MobileFeatureCarousel features={features} />
                <div className="hidden md:flex flex-wrap justify-center gap-8">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (

                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)] bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                                    <Icon className="text-blue-600" size={28} />
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>

                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* AGENT ARCHITECTURE */}

            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Multi-Agent AI Architecture
                    </h2>

                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Cognigate uses specialized AI agents working together to
                        simulate human-like recruiter behavior.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {[
                        { name: "Resume Agent", icon: FileSearch },
                        { name: "Technical Agent", icon: Code },
                        { name: "HR Agent", icon: Users },
                        { name: "Follow-up Agent", icon: MessageSquarePlus },
                        { name: "Memory Agent", icon: Database },
                        { name: "Evaluation Agent", icon: ClipboardCheck },
                        { name: "Difficulty Agent", icon: Gauge },
                        { name: "Analytics Agent", icon: PieChart },
                    ].map((agent, index) => {
                        const Icon = agent.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] bg-white border border-gray-200 rounded-2xl p-4 md:p-6 text-center shadow-sm hover:shadow-lg transition group"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-3 md:mb-4 border border-blue-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-300">
                                    <Icon className="text-blue-600 group-hover:text-white transition-colors duration-300 w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                                    {agent.name}
                                </h3>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* CTA SECTION */}

            <section className="pb-24 px-6">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl md:rounded-[40px] p-10 md:p-14 text-center text-white shadow-2xl">

                    <h2 className="text-3xl md:text-4xl font-bold">
                        Experience the Future of Interview Preparation
                    </h2>

                    <p className="mt-6 text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
                        Build confidence with AI-powered mock interviews,
                        adaptive questioning, and intelligent performance analysis.
                    </p>

                    <Link to="/signup" className="inline-block mt-10 bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
                        Get Started
                    </Link>

                </div>
            </section>
        </div>
    );
}

export default FeaturesPage;