import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Navbar />
            <div className="mx-auto flex-grow w-full">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
