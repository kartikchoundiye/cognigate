import { useAuth } from "@/hooks/useAuth";

const DashboardPage = () => {
    const { user } = useAuth();

    return (

        <div className="space-y-6">

            {/* HERO CARD */}
            <section
                className="
                    bg-white
                    rounded-3xl
                    p-8
                    border border-gray-200
                "
            >

                <h1
                    className="
                        text-3xl md:text-4xl
                        font-bold
                        text-gray-900
                    "
                >

                    Welcome back,
                    {" "}
                    {user?.username || "Candidate"} 👋

                </h1>

                <p
                    className="
                        mt-3
                        text-gray-600
                        text-lg
                    "
                >

                    Continue your AI-powered interview preparation journey.

                </p>

            </section>

            {/* STATS */}
            <section
                className="
                    grid grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-4
                    gap-6
                "
            >

                {[
                    "Interviews",
                    "Readiness Score",
                    "Technical Accuracy",
                    "Communication",
                ].map((item) => (

                    <div
                        key={item}
                        className="
                            bg-white
                            rounded-2xl
                            border border-gray-200
                            p-6
                        "
                    >

                        <h3 className="text-gray-500">

                            {item}

                        </h3>

                        <p
                            className="
                                mt-3
                                text-3xl font-bold
                                text-gray-900
                            "
                        >

                            0

                        </p>

                    </div>
                ))}
            </section>

        </div>
    );
};

export default DashboardPage;