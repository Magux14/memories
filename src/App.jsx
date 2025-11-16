import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './pages/home/HomePage';
import { Story } from './pages/story/Story';

export const App = () => {

    return (
        <BrowserRouter basename={import.meta.env.VITE_PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/story/:id" element={<Layout><Story /></Layout>} />
            </Routes>
        </BrowserRouter>
    )
}
