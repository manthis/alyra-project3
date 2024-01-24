const MessageBox = ({ message }) => {
    return (
        <div className="bg-blue-500 text-white font-semibold w-full flex flex-col justify-center items-center border-2 border-slate-600 rounded-lg mb-4">
            <p className="p-4">{message}</p>
        </div>
    );
};

export default MessageBox;
