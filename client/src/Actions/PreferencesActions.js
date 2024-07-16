export const getSaveCities = async (userEmail) => {
  const uri = `https://vercel.com/fedeva1996s-projects/weather-app-backend/5CoaKQpEmoswxxpDxLs6K6KdhDGp/api/users/${userEmail}/cities`;
  const getOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt"),
    },
  };
  const response = await fetch(uri, getOptions);
  const data = response.json();
  //console.log(data);
  return data;
};

export const saveCity = async (userEmail, newCity) => {
  const uri = `https://vercel.com/fedeva1996s-projects/weather-app-backend/5CoaKQpEmoswxxpDxLs6K6KdhDGp/api/users/${userEmail}/cities`;

  // Obtén las ciudades actuales del usuario
  const getOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt"),
    },
  };
  const response = await fetch(uri, getOptions);
  const currentCities = await response.json();

  // Verifica si el número de ciudades actuales más la nueva excede el límite
  if (currentCities.length >= 2) {
    return "You can only save up to 2 cities";
  }

  // Si no se excede el límite, guarda la nueva ciudad
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt"),
    },
    body: JSON.stringify(newCity),
  };

  await fetch(uri, postOptions);
};

export const removeCity = async (userEmail, cityName) => {
  const uri = `https://vercel.com/fedeva1996s-projects/weather-app-backend/5CoaKQpEmoswxxpDxLs6K6KdhDGp/api/users/${userEmail}/cities/${cityName}`;
  const getOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt"),
    },
  };
  const response = await fetch(uri, getOptions);
  if (response.status === 200) {
    return "City removed";
  } else {
    return "City not removed";
  }
};

export async function getPreferences(userEmail) {
  const uri = `https://vercel.com/fedeva1996s-projects/weather-app-backend/5CoaKQpEmoswxxpDxLs6K6KdhDGp/api/users/${userEmail}/preferences`;
  const getOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt"),
    },
  };
  const response = await fetch(uri, getOptions);
  if (response.status === 200) {
    return response.json();
  } else {
    return "No preferences found";
  }
}

export async function setPreferences(userEmail, preferences) {
  //console.log(preferences);
  const uri = `https://vercel.com/fedeva1996s-projects/weather-app-backend/5CoaKQpEmoswxxpDxLs6K6KdhDGp/api/users/${userEmail}/preferences`;
  const postOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt"),
    },
    body: JSON.stringify(preferences),
  };
  const response = await fetch(uri, postOptions);
  if (response.status === 200) {
    return "Preferences updated";
  } else {
    return "Cant set preferences";
  }
}
