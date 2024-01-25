import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ContractContextProvider } from "../contexts/ContractContext";
import PrivateSection from "./private/PrivateSection";
import PublicSection from "./public/PublicSection";

const Home = () => {
    return (
        <ContractContextProvider>
            <div className="flex justify-center items-center bg-slate-200 min-h-screen">
                <div
                    id="header"
                    className="fixed top-0 h-16 bg-transparent w-full flex justify-between items-center border-b-2 border-slate-600"
                >
                    <h1 className="text-xl font-bold pl-4">
                        Alyra: Project 3 - Voting dApp
                    </h1>
                    <div className="m-2">
                        <ConnectButton />
                    </div>
                </div>
                <section className="min-h-screen flex flex-col justify-center items-center fixed top-0 p-4 w-4/5">
                    <PublicSection />
                    <PrivateSection />
                </section>
            </div>
        </ContractContextProvider>
    );
};

export default Home;
