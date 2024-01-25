const MessageBox = ({ message, color = "bg-blue-600" }) => {
    let style =
        color +
        " text-white font-semibold flex flex-col justify-center items-center mb-4 fixed z-50";

    if (color === "bg-blue-600") {
        style += " bottom-40 italic animate-bounce rounded-full";
    } else {
        style += " top-40 w-2/5 rounded-lg max-w-[1000px]";
    }

    return (
        <div className={style}>
            <p className="p-4">{message}</p>
        </div>
    );
};

export default MessageBox;
