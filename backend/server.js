import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.options(/.*/, cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "StockSense API is running 🚀"
  });
});

// Get all stocks
app.get("/api/stocks", async (req, res) => {
  try {
    const stocks = await db.orm.public.Stock.all();
    res.json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
});

// Add a stock
app.post("/api/stocks", async (req, res) => {
  try {
    const { symbol, companyName, sector, price } = req.body;

    const stock = await db.orm.public.Stock.create({
      symbol,
      companyName,
      sector,
      price
    });

    res.status(201).json(stock);
  } catch (error) {
    console.error("CREATE STOCK ERROR:", error);
    res.status(500).json({
      error: "Failed to create stock",
      details: error.message
    });
  }
});
// Create user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    const user = await db.orm.public.User.create({
      name,
      email,
      password,
      role: "user"
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error("CREATE USER ERROR:", error);

    if (error?.message?.includes("duplicate") || error?.message?.includes("unique")) {
      return res.status(409).json({ error: "User with this email already exists" });
    }

    res.status(500).json({
      error: "Failed to create user",
      details: error.message
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await db.orm.public.User.findFirst({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const validPassword = user.password === password;
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      error: "Failed to log in",
      details: error.message
    });
  }
});

// Create alert
app.post("/api/alerts", async (req, res) => {
  try {
    const { message, targetPrice, userId, stockId } = req.body;

    const alert = await db.orm.public.Alert.create({
      message,
      targetPrice,
      triggered: false,
      userId,
      stockId
    });

    res.status(201).json(alert);
  } catch (error) {
    console.error("CREATE ALERT ERROR:", error);
    res.status(500).json({
      error: "Failed to create alert",
      details: error.message
    });
  }
});

// Get alerts
app.get("/api/alerts", async (req, res) => {
  try {
    const alerts = await db.orm.public.Alert.all();
    res.json(alerts);
  } catch (error) {
    console.error("GET ALERTS ERROR:", error);
    res.status(500).json({
      error: "Failed to fetch alerts",
      details: error.message
    });
  }
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`StockSense server running on port ${PORT}`);
});