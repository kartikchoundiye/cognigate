import InterviewMessage from "./InterviewMessage";

function InterviewChat() {

    const messages = [
        {
            sender: "ai",
            text: "Tell me about your Cognigate project."
        },
        {
            sender: "user",
            text: "Cognigate is an AI-powered interview preparation system."
        },
    ];

    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {messages.map((msg, index) => (

                <InterviewMessage
                    key={index}
                    sender={msg.sender}
                    text={msg.text}
                />

            ))}

        </div>
    );
}

export default InterviewChat;