require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtConfig = require("./jwt.config");
const cors = require("cors");
const User = require("./Models/User"); // Asegúrate de ajustar la ruta al modelo según tu estructura de proyecto
const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.set("key", jwtConfig.clave);
app.use(express.json());
app.use(cors(corsOptions));

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).send("User registered");
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user._id }, "secret");
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Middleware de autenticación
const auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.userId = decoded.userId;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/api/users/:userId/cities", auth, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.savedCities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved cities", error });
  }
});

app.post("/api/users/:userId/cities", auth, async (req, res) => {
  const { userId } = req.params;
  const { nombre, lat, lon } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.savedCities.push({ nombre, lat, lon });
    await user.save();

    res.status(200).json(user.savedCities);
  } catch (error) {
    res.status(500).json({ message: "Error adding city", error });
  }
});

app.delete("/api/users/:userId/cities/:cityName", auth, async (req, res) => {
  const { userId, cityName } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.savedCities = user.savedCities.filter(
      (city) => city.nombre !== cityName
    );
    await user.save();

    res.status(200).json(user.savedCities);
  } catch (error) {
    res.status(500).json({ message: "Error removing city", error });
  }
});

app.put("/api/users/:userId/preferences", auth, async (req, res) => {
  const { userId } = req.params;
  const { units, theme, animation } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.preferences = { units, theme, animation }; // Asegúrate de usar el nombre correcto del campo
    await user.save();

    res.status(200).json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: "Error updating preferences", error });
  }
});
app.put("/api/users/:userId/preferences", auth, async (req, res) => {
  const { userId } = req.params;
  const { units, theme, animation } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.preferences = { units, theme, animation }; // Asegúrate de usar el nombre correcto del campo
    await user.save();

    res.status(200).json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: "Error updating preferences", error });
  }
});

app.put("/api/users/:userId/preferences", auth, async (req, res) => {
  const { userId } = req.params;
  const { units, theme, animation } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.preferences = { units, theme, animation }; // Asegúrate de usar el nombre correcto del campo
    await user.save();

    res.status(200).json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: "Error updating preferences", error });
  }
});

// Endpoint para obtener datos meteorológicos (ejemplo)
app.get("/api/weather", async (req, res) => {
  const { lat, lon, units } = req.query;
  // Lógica para obtener datos meteorológicos usando la API externa
  res.json({
    /* Datos meteorológicos */
  });
});
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error);
  });

app.listen(process.env.PORT || 3001, () =>
  console.log("Server started on port", process.env.PORT)
);
