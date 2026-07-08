import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import emailRoutes from "./routes/emailRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

// Map legacy environment variables for backwards compatibility
if (!process.env.MONGODB_URI && process.env.MONGO_URI) {
  process.env.MONGODB_URI = process.env.MONGO_URI;
}
if (!process.env.EMAIL_USER && process.env.SMTP_USER) {
  process.env.EMAIL_USER = process.env.SMTP_USER;
}
if (!process.env.EMAIL_PASS && process.env.SMTP_PASS) {
  process.env.EMAIL_PASS = process.env.SMTP_PASS;
}

// Normalize CLIENT_URL if it has a trailing slash
if (process.env.CLIENT_URL) {
  process.env.CLIENT_URL = process.env.CLIENT_URL.replace(/\/$/, "");
}

// Validate required environment variables
const requiredEnvVars = [
  "MONGODB_URI",
  "JWT_SECRET",
  "EMAIL_USER",
  "EMAIL_PASS",
  "CLIENT_URL"
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error("======================================================================");
  console.error("CRITICAL STARTUP ERROR: Missing required environment variables!");
  console.error("======================================================================");
  missingEnvVars.forEach(varName => {
    console.error(`  - ${varName} is missing`);
  });
  console.error("======================================================================");
  console.error("Please configure these variables in your .env file or hosting provider settings.");
  console.error("Process exiting with code 1.");
  process.exit(1);
}

// Connect to MongoDB
connectDB();

const app = express();

// CORS configuration supporting localhost, production, and Vercel preview domains
const allowedOrigins = Array.from(new Set([
  "http://localhost:5173",
  "https://mailflow-ai-phi.vercel.app",
  process.env.CLIENT_URL
].filter(Boolean)));

const corsOptions = {
  origin: function (origin, callback) {
    // Allow request if no origin header is present (like server-to-server or Postman/curl)
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, "");

    // Check if origin matches allowed static origins
    if (allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    }

    // Check if it's a localhost origin
    if (/^https?:\/\/localhost(:\d+)?$/.test(cleanOrigin) || /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(cleanOrigin)) {
      return callback(null, true);
    }

    // Check if it's a Vercel preview deployment (subdomain.vercel.app)
    if (/^https:\/\/([a-zA-Z0-9-]+-)*[a-zA-Z0-9-]+\.vercel\.app$/.test(cleanOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${cleanOrigin} not allowed by CORS`));
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("API running");
});

// Routes
app.use("/api/email", emailRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


