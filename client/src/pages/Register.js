import { useContext, useState } from "react";
import { registerUser } from "../Actions/AuthActions";
import { AuthContext } from "../Contexts/AuthContexts";
const Register = () => {
  const [error, setError] = useState("");
  const context = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = e.target.elements;
    const body = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    try {
      const response = await registerUser(body, context.dispatch);

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
    <div className="flex h-screen w-full items-center justify-center bg-gray-950 text-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            O{" "}
            <a
              href="/"
              className="font-medium text-primary hover:text-primary/80 hover:underline"
            >
              ingresa a tu cuenta existente
            </a>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="w-full text-red-600 text-center">{error}</div>
          <div>
            <label htmlFor="username" className="sr-only">
              Nombre de usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder="Ingresa tu nombre de usuario"
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-black placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Ingresa tu correo electrónico"
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-black placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Ingresa tu contraseña"
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-black placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full h-full border-2 border-gray-100 hover:bg-gray-100 px-3 py-2 hover:text-black rounded-md"
            >
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
