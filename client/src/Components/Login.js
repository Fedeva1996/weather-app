import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContexts";
import { loginUser } from "../Actions/AuthActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = (event) => {
    //console.log("login the user");
    event.preventDefault();
    if (email === "" || password === "") {
      setError("Datos incompletos");
    } else {
      loginUser({ email, password }, context.dispatch);
      //console.log(context)
    }
  };

  return (
    <div className="">
      <strong className="block p-2 text-xs font-medium uppercase text-gray-400">
        Login
      </strong>
      <form onSubmit={handleSubmit}>
        <p className="error">{error ? error : ""}</p>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full h-full rounded-md p-2  bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-full rounded-md p-2  bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            value="Login"
            className="w-full h-8 rounded-md m-auto  bg-gray-300 text-gray-700 dark:bg-gray-800 dark:text-white hover:bg-gray-400 hover:dark:bg-gray-700 hover:text-gray-100"
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
