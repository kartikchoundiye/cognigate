function InterviewMessage({ sender, text }) {

    const isAI = sender === "ai";

    return (
        <div
            className={`flex ${isAI ? "justify-start" : "justify-end"
                }`}
        >

            <div
                className={`
                    max-w-[75%]
                    px-4
                    py-3
                    rounded-2xl
                    text-sm
                    shadow-sm
                    ${isAI
                        ? "bg-white text-gray-800 border border-gray-200"
                        : "bg-blue-600 text-white"
                    }
                `}
            >

                {text}

            </div>

        </div>
    );
}

export default InterviewMessage;