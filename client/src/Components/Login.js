import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContexts";
import { loginUser } from "../Actions/AuthActions";

const Login = () => {
  const [error, setError] = useState("");

  //console.log("jwt", jwt);
  const navigate = useNavigate();
  // Importar el contexto
  const context = useContext(AuthContext);

  //console.log(context);

  useEffect(() => {
    if (context.currentUser.authenticated === true) {
      navigate("/home");
    }
  }, [context.currentUser.authenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const body = {
      email: email.value,
      password: password.value,
    };
    try {
      const response = await loginUser(body, context.dispatch);

      if (response === "done") {
        window.location.href = "/";
      } else {
        setError(response.error);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      setError(error);
    }
  };

  return (
    <div className="">
      <strong className="block text-xs font-medium uppercase text-gray-400 mb-2">
        Iniciar sesión
      </strong>
      <form onSubmit={handleSubmit}>
        <p className="w-full text-red-600 text-center">{error}</p>
        <div className="flex flex-col gap-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Correo electrónico"
            className="w-full h-full rounded-md p-2  bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            autoComplete="current-password"
            className="w-full h-full rounded-md p-2  bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            value="Login"
            className="w-full h-8 rounded-md m-auto  bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white hover:bg-gray-400 hover:dark:bg-gray-700 hover:text-gray-100"
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
