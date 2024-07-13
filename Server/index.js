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
    // Chequeamos si el email existe en nuestra base de datos
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Creamos el objeto usuario desde el modelo Usuario
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado correctamente" });
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
        .json({ error: "El email no existe en nuestra base de datos" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //console.log("passwordMatch", passwordMatch);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Las contraseñas no son correctas" });
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
  const token = authorization
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

app.get("/api/users/:userId/cities", verifyToken, async (req, res) => {
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

app.post("/api/users/:userId/cities", verifyToken, async (req, res) => {
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

app.delete(
  "/api/users/:userId/cities/:cityName",
  verifyToken,
  async (req, res) => {
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
  }
);

app.put("/api/users/:userId/preferences", verifyToken, async (req, res) => {
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
app.put("/api/users/:userId/preferences", verifyToken, async (req, res) => {
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

app.put("/api/users/:userId/preferences", verifyToken, async (req, res) => {
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
