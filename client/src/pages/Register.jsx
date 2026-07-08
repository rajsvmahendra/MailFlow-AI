import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL } from "../config";
import { useToast } from "../context/ToastContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { addToast } = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Create Account | MailFlow AI";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!name || !email || !password || !confirmPassword) {
      addToast("Please fill all fields", "error");
      return;
    }

    if (password !== confirmPassword) {
      addToast("Passwords do not match", "error");
      return;
    }

    if (password.length < 6) {
      addToast("Password must be at least 6 characters", "error");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error("Unable to parse server response. The server might be down or misconfigured.");
      }

      if (response.ok) {
        // Save JWT token and user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        addToast("Account registered successfully!", "success");

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        addToast(data.message || "Registration failed", "error");
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

          {/* Left Side - Register Form */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="bg-white rounded-card-lg border border-gray-100 shadow-xl p-8 md:p-10 max-w-md w-full">

              <h2 className="text-3xl font-bold text-brand-primary mb-2">
                Create your account
              </h2>

              <p className="text-gray-500 mt-2 mb-6">
                Join MailFlow AI and start writing smarter emails
              </p>

              <form className="space-y-4" onSubmit={handleRegister}>

                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  aria-label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-primary"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-primary"
                />

                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-primary"
                />

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-primary"
                />

                <button
                  type="submit"
                  className="btn-primary w-full py-3 rounded-input text-base font-semibold shadow-md"
                >
                  Register
                </button>

              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-brand-accent font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side Image */}
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

export default Register;