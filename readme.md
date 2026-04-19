# Weather App

A full-stack weather application built with React, Node.js, and Express. Provides real-time weather data for any city worldwide using the [WeatherAPI](https://www.weatherapi.com/) service.

**Live demo:** https://weather-app-client-psi.vercel.app/

---

## Features

- Search current weather by city (temperature, humidity, wind, conditions)
- User registration to save city preferences
- Decoupled architecture: React frontend + Express backend as API proxy
- CI/CD pipeline with GitHub Actions and deployment to Vercel

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React, Tailwind CSS               |
| Backend    | Node.js, Express                  |
| API        | WeatherAPI.com                    |
| Deploy     | Vercel (client + server)          |
| CI/CD      | GitHub Actions                    |

## Project Structure

```
weather-app/
├── client/          # React frontend
└── Server/          # Node.js + Express API proxy
```

## Getting Started

### Prerequisites

- Node.js 18+
- A free API key from [weatherapi.com](https://www.weatherapi.com/)

### Installation

```bash
# Clone the repo
git clone https://github.com/Fedeva1996/weather-app.git
cd weather-app

# Install server dependencies
cd Server
npm install

# Install client dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file inside the `Server/` folder:

```env
WEATHER_API_KEY=your_api_key_here
PORT=3001
```

### Run locally

```bash
# Start the backend (from /Server)
npm run dev

# Start the frontend (from /client)
npm run dev
```

The app will be available at `http://localhost:5173`.

## License

MIT
