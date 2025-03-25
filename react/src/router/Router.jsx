import React from 'react';
import Home from '../components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import PositionsContainer from '../components/PositionsContainer';
import ThankYouPage from '../components/ThankYouPage';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                {/* <Route path="/" element={<PositionsContainer userRole="voter" />} />
        <Route path="/admin" element={<PositionsContainer userRole="admin" />} /> */}
                <Route path="/thank-you" element={<ThankYouPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;