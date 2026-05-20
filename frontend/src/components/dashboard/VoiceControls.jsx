import { PhoneOff } from "lucide-react";

function VoiceControls() {

    return (
        <div
            className="
                fixed
                bottom-6
                right-6
                z-50
            "
        >

            <button
                className="
                    w-14
                    h-14
                    rounded-full
                    bg-red-500
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-lg
                "
            >

                <PhoneOff size={22} />

            </button>

        </div>
    );
}

export default VoiceControls;