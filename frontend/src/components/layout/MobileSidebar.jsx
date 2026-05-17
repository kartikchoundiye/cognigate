const MobileSidebar = ({
    openSidebar,
    setOpenSidebar,
}) => {

    if (!openSidebar) return null;

    return (

        <div
            className="
                fixed inset-0
                bg-black/40
                z-50
                lg:hidden
            "
            onClick={() => setOpenSidebar(false)}
        >

            <div
                className="
                    w-64 h-full
                    bg-white
                    shadow-xl
                "
                onClick={(e) => e.stopPropagation()}
            >

                <div className="p-6">

                    <h1
                        className="
                            text-2xl font-bold
                            text-blue-600
                        "
                    >

                        Cognigate

                    </h1>

                </div>

            </div>

        </div>
    );
};

export default MobileSidebar;