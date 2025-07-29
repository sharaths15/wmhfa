import { useAuth } from "../../hooks/useAuth";

export const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to your Dashboard!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Hello, <span className="font-semibold">{user?.fullName}</span>
        </p>
        <p className="text-sm text-gray-500">{user?.email}</p>
        <button
          onClick={logout}
          className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
