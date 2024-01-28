const MessageBox = ({ message, color = "bg-red-700" }) => {
    let style =
        color +
        " text-white font-semibold flex flex-col justify-center items-center mb-4 fixed z-50";

    if (color === "bg-red-700") {
        style += " italic animate-pulse rounded-full";
    } else {
        style += " top-40 w-2/5 rounded-lg max-w-[1000px] opacity-90";
    }

    return (
        <div className={style}>
            <p className="p-4">{message}</p>
        </div>
    );
};

export default MessageBox;
