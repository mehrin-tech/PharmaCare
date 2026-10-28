import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-600">
        403 - Access Denied
      </h1>

      <p className="mt-3 text-gray-600">
        You don't have permission to access this page.
      </p>

      <Link
        to="/"
        className="mt-5 rounded-lg bg-emerald-600 px-5 py-2 text-white"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Unauthorized;