import { ConnectButton } from "@rainbow-me/rainbowkit";
import PrivateSection from "./private/PrivateSection";
import PublicSection from "./public/PublicSection";

const Home = () => {
    return (
        <div className="flex justify-center items-center bg-slate-200 min-h-screen">
            <div
                id="header"
                className="fixed top-0 h-16 bg-transparent w-full flex justify-between items-center border-b-2 border-slate-600"
            >
                <h1 className="text-xl font-bold pl-4">
                    Alyra: Project 3 - Voting dApp
                </h1>
                <div className="m-2">
                    {/* RainbowKit Button */}
                    <ConnectButton />
                </div>
            </div>
            <section className="min-h-screen mt-16 flex flex-col justify-top items-center w-full fixed top-0 p-4 w-4/5">
                <PrivateSection />
                <PublicSection />
            </section>
        </div>
    );
};

export default Home;
