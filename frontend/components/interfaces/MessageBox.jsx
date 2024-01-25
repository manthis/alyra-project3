const MessageBox = ({ message, color = "bg-blue-600" }) => {
    const style =
        color +
        " " +
        "text-white font-semibold w-full flex flex-col justify-center items-center border-2 border-slate-600 rounded-lg mb-4";

    return (
        <div className={style}>
            <p className="p-4">{message}</p>
        </div>
    );
};

export default MessageBox;
