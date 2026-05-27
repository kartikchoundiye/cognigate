import React, { useState } from "react";
import {
    Brain,
    Layers3,
    Target,
    ShieldCheck,
    ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "How does the AI interviewer evaluate my answers?",
        answer: "The AI evaluates your answers based on technical accuracy, communication clarity, and contextual relevance. It uses advanced language models to simulate a real recruiter's judgment."
    },
    {
        question: "Can I use my own resume for mock interviews?",
        answer: "Yes! You can upload your resume, and our system will dynamically generate questions based on your specific experience, projects, and tech stack."
    },
    {
        question: "Are the interview questions the same every time?",
        answer: "No. Cognigate uses an adaptive AI engine that generates unique questions every session based on your resume, past performance, and the conversational flow."
    },
    {
        question: "Is voice interaction supported?",
        answer: "Absolutely. We integrate speech-to-text and text-to-speech technologies so you can practice speaking your answers out loud just like in a real interview."
    }
];

function FAQItem({ faq }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="text-gray-500" size={24} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function AboutPage() {

    const technologies = [
        "React.js",
        "FastAPI",
        "PostgreSQL",
        "LangChain",
        "LangGraph",
        "ChromaDB",
        "Groq + Llama 3",
        "Whisper AI",
        "JWT Authentication",
        "Tailwind CSS",
    ];

    return (
        <div className="bg-[#F7F9FC] min-h-screen pt-20 lg:pt-24">

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 pt-4 pb-16 md:pt-6 md:pb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-6">
                        <Brain size={16} />
                        Our Vision & Story
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Empowering Careers Through <br className="hidden md:block" />
                        <span className="text-blue-600">Intelligent AI</span>
                    </h1>

                    <p className="mt-6 md:mt-8 text-base md:text-lg text-gray-600 leading-relaxed">
                        Cognigate is an AI-driven conversational interview
                        preparation system designed to simulate realistic
                        recruiter interactions using advanced Large Language
                        Models, multi-agent workflows, resume intelligence,
                        adaptive questioning, and voice-based communication.
                    </p>
                </div>
            </section>

            {/* MISSION SECTION */}

            <section className="max-w-7xl mx-auto px-6 pb-20">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-10 lg:p-14">
                    <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">

                                <ShieldCheck size={18} />
                                Our Mission

                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                Building Smarter & More Human-Like Interview Experiences
                            </h2>

                            <p className="mt-6 text-gray-600 leading-relaxed text-base md:text-lg">

                                Traditional interview preparation platforms
                                often rely on static question banks and lack
                                contextual understanding. Cognigate aims to
                                bridge this gap by creating intelligent AI
                                interviewers capable of memory, contextual
                                follow-ups, adaptive questioning, and resume-aware conversations.

                            </p>

                            <p className="mt-4 text-gray-600 leading-relaxed text-base md:text-lg">

                                Our goal is to help candidates practice in an
                                environment that closely resembles real-world
                                technical and HR interviews.

                            </p>

                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 md:p-10 border border-blue-100">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-600 text-white p-3 rounded-2xl">
                                        <Brain size={24} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">
                                            Conversational Memory
                                        </h3>

                                        <p className="text-gray-600 mt-1">

                                            AI remembers previous responses
                                            for intelligent contextual flow.

                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-indigo-600 text-white p-3 rounded-2xl">
                                        <Layers3 size={24} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">
                                            Multi-Agent Workflow
                                        </h3>

                                        <p className="text-gray-600 mt-1">

                                            Different AI agents collaborate
                                            to create realistic interviews.

                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-cyan-600 text-white p-3 rounded-2xl">
                                        <Target size={24} />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">
                                            Adaptive Intelligence
                                        </h3>

                                        <p className="text-gray-600 mt-1">

                                            Questions evolve based on
                                            candidate performance and skills.

                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="max-w-4xl mx-auto px-6 pb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-gray-600 text-base md:text-lg">
                        Everything you need to know about how Cognigate works.
                    </p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} />
                    ))}
                </div>
            </section>

            {/* TECHNOLOGY STACK */}

            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-10 lg:p-14">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Technology Stack
                        </h2>

                        <p className="mt-4 text-gray-600 text-base md:text-lg">
                            Built using modern AI and full-stack technologies.
                        </p>

                    </div>

                    <div className="mt-10 md:mt-12 flex flex-wrap justify-center gap-3 md:gap-4">

                        {technologies.map((tech, index) => (

                            <div
                                key={index}
                                className="px-4 py-2 md:px-5 md:py-3 bg-blue-50 text-blue-700 rounded-xl md:rounded-2xl border border-blue-100 text-sm md:text-base font-medium"
                            >

                                {tech}

                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutPage;
