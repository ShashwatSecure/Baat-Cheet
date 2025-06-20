import App from '../App.jsx'
import {Routes,Route } from 'react-router'
import ChatRoom from '../components/ChatRoom.jsx'
import SignupPage from '../components/SignupPage.jsx'
import ProfilePage from '../components/ProfilePage.jsx'
import JoinRoom from '../components/JoinRoom.jsx'
import CreateRoom from '../components/CreateRoom.jsx'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<App />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/chat/:roomId/:username" element={<ChatRoom />} />
            <Route path="/:username/create-room" element={<CreateRoom />} />
            <Route path="/:username/join-room" element={<JoinRoom />} />
            <Route path="/about" element={<h1>About Page</h1>} />
            <Route path="*" element={<h1 className='text-slate-300 '>404 Page not found!</h1>} />
        </Routes>
    )
}

export default AppRoutes;