export default function preferencesReducerReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE":
      return action.payload;
    case "SET_CITIES":
      const newState = {
        ...state,
        cities: action.payload,
      };
      localStorage.setItem("currentUserCities", JSON.stringify(newState));
      return newState;

    case "DELETE_CITIES":
      const updatedCities = state.cities.filter(
        (city) => city._id !== action.payload
      );
      const newStateAfterDelete = {
        ...state,
        cities: updatedCities,
      };
      localStorage.setItem(
        "currentUserCities",
        JSON.stringify(newStateAfterDelete)
      );
      return newStateAfterDelete;

    default:
      return state;
  }
}
