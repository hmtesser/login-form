import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './Signup/SignUp';
import UserCreated from './UserCreated/UserCreated';

function App() {
  const location = useLocation();
  const isSignUp = location.pathname === '/signup';

  return (
    <div className="flex w-full h-screen">
      <div
        className={`w-full flex items-center justify-center ${
          isSignUp ? 'lg:w-full' : 'lg:w-2/3'
        }`}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/usercreated" element={<UserCreated />} />
        </Routes>
      </div>
      {!isSignUp && (
        <div className="hidden relative lg:flex w-1/3 h-full items-center justify-center bg-gray-200">
          <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce"></div>
          <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
        </div>
      )}
    </div>
  );
}

export default App;
