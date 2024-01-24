const MessageBox = ({ message }) => {
    return (
        <div className="bg-orange-400 w-full flex flex-col justify-center items-center border-2 border-slate-600 rounded-lg mb-2">
            <p className="p-4">{message}</p>
        </div>
    );
};

export default MessageBox;
