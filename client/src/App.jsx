import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { FullPageLoader } from "./components/Skeletons";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateEmail = lazy(() => import("./pages/CreateEmail"));
const EmailHistory = lazy(() => import("./pages/EmailHistory"));

function App() {
  return (
    <ToastProvider>
      <Router>
        <Suspense fallback={<FullPageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/email-history"
              element={
                <ProtectedRoute>
                  <EmailHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-email"
              element={
                <ProtectedRoute>
                  <CreateEmail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </ToastProvider>
  );
}

export default App;
