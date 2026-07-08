import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL } from "../config";
import { useToast } from "../context/ToastContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In | MailFlow AI";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      addToast("Please fill in all fields", "error");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error("Unable to parse server response. The server might be down or misconfigured.");
      }

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        addToast("Signed in successfully!", "success");
        navigate("/dashboard");
      } else {
        addToast(data.message || "Login failed", "error");
      }
    } catch (error) {
      addToast(error.message || "Server error. Please try again.", "error");
    }
  };
  return (
    <div className="min-h-screen bg-brand-bg-light">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 pt-16 pb-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl w-full items-center">
          {/* Left Side - Login Form Card */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="bg-white rounded-card-lg border border-gray-100 shadow-xl p-8 md:p-10 max-w-md w-full">
              {/* Title */}
              <h2 className="text-3xl font-bold text-brand-primary mb-2">
                Welcome back
              </h2>

              {/* Subtitle */}
              <p className="text-gray-500 mt-2 mb-6">
                Sign in to continue to MailFlow AI
              </p>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleLogin}>
                {/* Email Input */}
                <div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-primary"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-primary"
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="btn-primary w-full py-3 rounded-input text-base font-semibold shadow-md"
                >
                  Sign In
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account?{" "}
                <Link to="/register" className="text-brand-accent font-semibold hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side - Premium Workspace Image (Desktop Only) */}
          <div className="hidden md:flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Premium workspace group work"
              className="rounded-card-lg shadow-xl object-cover h-[520px] w-full max-w-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

