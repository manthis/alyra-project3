import { ConnectButton } from '@rainbow-me/rainbowkit';
import PrivateSection from './PrivateSection';
import PublicSection from './PublicSection';

const Home = () => {
    return (
        <>
            <div
                id='header'
                className='fixed top-0 h-16 bg-transparent w-full flex justify-between items-center border-b-2 border-slate-600'>
                <h1 className='text-xl font-bold pl-4'>Alyra: Project 3 - Voting dApp</h1>
                <div className='m-2'>
                    <ConnectButton />
                </div>
            </div>
            <section className='min-h-screen bg-slate-200 mt-16 flex flex-col justify-top items-center'>
                <PrivateSection />
                <PublicSection />
            </section>
        </>
    );
};

export default Home;
