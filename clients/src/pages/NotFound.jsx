import { Link } from 'react-router-dom';

function NotFound() {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dash">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="mb-8 text-base">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="text-paysparq bg-secondary p-3 rounded-lg">Go back to Home</Link>
    </div>
  );
}

export default NotFound;