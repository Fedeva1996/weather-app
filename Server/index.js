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
  try {
    const { email, password, username } = req.body;

    // Validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Chequeamos si el nombre de usuario existe en nuestra base de datos
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Chequeamos si el email existe en nuestra base de datos
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Validar la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*.])(?=.*[a-z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long, contain at least one uppercase letter, and one special character",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el objeto usuario desde el modelo Usuario
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //console.log("user", user);
    if (!user) {
      return res
        .status(401)
        .json({ error: "El email no existe en nuestra base de datos", });
        
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //console.log("passwordMatch", passwordMatch);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Las contraseñas no son correctas", });
    }

    const secret = app.get("key");
    const token = jwt.sign({ email: user.email, username: user.user }, secret);
    res.status(200).json({ token, ok: true });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const verifyToken = (req, res, next) => {
  console.log(`header authorization: `, req.headers.authorization);
  const authorization = req.headers.authorization;
  const token = authorization;
  //console.log(`token: `, token);

  if (!token) {
    return res.status(401).json({ error: "No token sent" });
  }

  const secret = app.get("key");

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};

app.post("/auth", async (req, res) => {
  if (req.body.email) {
    const emailExistente = await User.findOne({ email: req.body.email });
    if (emailExistente) {
      const usuario = req.body.user;

      const payload = {
        usuario,
        email: emailExistente.email,
        checked: true,
      };
      const key = app.get("key");
      try {
        const token = jwt.sign(payload, key);
        res.send({
          message: "Token creado",
          token,
        });
      } catch (error) {
        res.send({
          message: "Hubo un error",
        });
      }
    } else {
      res.send({ message: "El email no existe en nuestros registros" });
    }
  } else {
    res.send({ message: "No se recibio el user" });
  }
});

app.get("/api/users/:email/cities", verifyToken, async (req, res) => {
  const { email } = req.params;
  //console.log(req.params);
  try {
    const user = await User.findOne({ email });
    console.log("user ", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.savedCities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching saved cities", error });
  }
});

app.post("/api/users/:email/cities", verifyToken, async (req, res) => {
  const { email } = req.params;
  const { nombre, lat, lon } = req.body;

  try {
    const user = await User.findOne({ email });
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

app.delete(
  "/api/users/:email/cities/:cityName",
  verifyToken,
  async (req, res) => {
    const { email, cityName } = req.params;

    try {
      const user = await User.findOne({ email });
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
  }
);

app.put("/api/users/:email/preferences", verifyToken, async (req, res) => {
  const { email } = req.params;
  const { units, theme, animations, extras } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.preferences = {
      units,
      theme,
      animations,
      extras,
    };
    await user.save();
    console.log(user.preferences);
    res.status(200).json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: "Error updating preferences", error });
  }
});

app.get("/api/users/:email/preferences", verifyToken, async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    console.log("user ", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: "Error updating preferences", error });
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
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
  console.log("Server started on port ", process.env.PORT)
);
