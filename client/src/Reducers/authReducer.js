export default function authReducer(state, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      const newState = {
        ...state,
        authenticated: !!action.payload.email,
        email: action.payload.email,
      };
      localStorage.setItem("currentUser", JSON.stringify(newState));
      return newState;

    case "DELETE_CURRENT_USER":
      localStorage.removeItem("currentUser");
      return {
        ...state,
        authenticated: false,
        email: "",
      };

    default:
      return state;
  }
}
