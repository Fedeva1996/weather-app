import { jwtDecode } from "jwt-decode";

// esta accion devolverá un objeto acción que se enviará con el dispatch
export const setCurrentUser = (user) => {
  return {
    type: "SET_CURRENT_USER",
    payload: {
      email: user.email,
    },
  };
};

// esta acción recibirá las credenciales y enviará las credenciales a la API
// con la respuesta de la API enviará el email con el dispatch
export const loginUser = async (credentials, dispatch) => {
  const path = "http://localhost:3001/api/login";
  const body = credentials; // { email: '', password: ''}

  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.ok === true) {
      // recibir el token de la respuesta del servidor
      const token = data.token;
      // guardar el token en el window.localStorage
      localStorage.setItem("jwt", token);
      //console.log("token: ", token);
      const decodedToken = jwtDecode(token); // { email: 'email del usuario'}
      dispatch({
        type: "SET_CURRENT_USER",
        payload: {
          email: decodedToken.email,
        },
      });
      return "done";
    } else {
      dispatch({
        type: "SET_CURRENT_USER",
        payload: {
          email: "",
        },
      });
      return "error";
    }
  } catch (error) {
    console.error("Error durante la autenticación:", error);
    dispatch({
      type: "SET_CURRENT_USER",
      payload: {
        email: "",
      },
    });
    return "error";
  }
};

// esta acción borrará el token del localStorage y enviará un currentUser vacío al dispatch
export const logoutUser = (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({
    type: "SET_CURRENT_USER",
    payload: {
      email: "",
    },
  });
};
