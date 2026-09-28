import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import MainDashboard from "./components/pages/MainDashboard";
import AuthProvider from "./middlewares/AuthContext";
import ProtectedRoute from "./middlewares/AuthProtected";
import HistoryOutcomePage from "./components/pages/history/HistoryOutcomePage";
import HistoryIncomePage from "./components/pages/history/HistoryIncomePage";
import DetailOutcomePage from "./components/pages/detail/DetailOutcomePage";
import DetailIncomePage from "./components/pages/detail/DetailIncomePage";

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
          <Route
            path="/detail/outcome/:id"
            element={
              <ProtectedRoute>
                <DetailOutcomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/detail/income/:id"
            element={
              <ProtectedRoute>
                <DetailIncomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
