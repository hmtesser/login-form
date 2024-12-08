import { useNavigate } from 'react-router-dom';

const UserCreated: React.FC = () => {
  const navigate = useNavigate();
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
    navigate('/');
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
      <h1>
        User Created Succesfully, please click{' '}
        <a
          href="#"
          className="hover:text-blue-500 hover:underline"
          onClick={handleClick}
        >
          here
        </a>{' '}
        to get Back to Login Page
      </h1>
    </div>
  );
};

export default UserCreated;
