import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import MainDashboard from "./components/pages/MainDashboard";
import AuthProvider from "./middlewares/AuthContext";
import ProtectedRoute from "./middlewares/AuthProtected";
import HistoryOutcomePage from "./components/pages/history/HistoryOutcomePage";
import HistoryIncomePage from "./components/pages/history/HistoryIncomePage";

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
          <Route
            path="/outcome"
            element={
              <ProtectedRoute>
                <HistoryOutcomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <HistoryIncomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
