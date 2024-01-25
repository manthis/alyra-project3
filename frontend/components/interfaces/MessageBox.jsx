const MessageBox = ({ message, color = "bg-blue-600" }) => {
    let style =
        color +
        " text-white font-semibold flex flex-col justify-center items-center border-2 border-slate-600 rounded-lg mb-4 fixed z-50";

    if (color === "bg-blue-600") {
        style += " mb-80";
    } else {
        style += " top-20 w-4/5";
    }

    return (
        <div className={style}>
            <p className="p-4">{message}</p>
        </div>
    );
};

export default MessageBox;
