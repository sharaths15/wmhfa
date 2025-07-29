import { Outlet } from "react-router-dom";
import { AuthProvider } from "./app/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default App;
