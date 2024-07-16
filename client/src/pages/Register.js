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
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{" "}
            <a
              href="/"
              className="font-medium text-primary hover:text-primary/80 hover:underline"
            >
              sign in to your existing account
            </a>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="w-full text-red-600 text-center">{error}</div>
          <div>
            <label htmlFor="username" className="sr-only">
              Name
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              placeholder="Enter your user name"
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-black placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-black placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-black placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full h-full hover:bg-gray-500 px-3 py-2 hover:text-gray-100 rounded-md"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
