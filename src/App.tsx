import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import MainDashboard from "./components/pages/MainDashboard";
import AuthProvider from "./middlewares/AuthContext";
import ProtectedRoute from "./middlewares/AuthProtected";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
