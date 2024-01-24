import Connect from './Connect';
import { useAuth } from './auth/AuthContext';
import withAuthentication from './auth/withAuthentication';

const PrivateSection = () => {
    const user = useAuth();

    return (
        <div className='border-2 border-slate-600 rounded-lg m-2 w-2/4 flex flex-col justify-center items-center p-4'>
            <p>Private Section: under construction</p>
        </div>
    );
};

export default withAuthentication(PrivateSection, Connect);
