# Bike Stations App

World's all bike stations app in React.

## Prerequisites

- Node.js (v20 or later)
- Docker
- Docker Compose

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd bike-stations
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   - Open `.env` and fill in your API keys:
     - `VITE_WEATHER_API_KEY`: Get from [OpenWeather](https://openweathermap.org/api)
     - `VITE_IP_STACK_API_KEY`: Get from [IPStack](https://ipstack.com)
     - `VITE_BIKE_API_URL`: Use `https://api.citybik.es/v2`

## Development

Run the app in development mode:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Production

### Using Docker

1. Build the Docker image:
```bash
npm run docker:build
```

2. Start the container:
```bash
npm run docker:up
```

The app will be available at `http://localhost:3000`

3. Stop the container:
```bash
npm run docker:down
```

### Manual Build

1. Build the app:
```bash
npm run build
```

2. Preview the build:
```bash
npm run preview
```

## Features

- Shows nearby bike stations
- Displays real-time weather information
- Groups stations by country
- Shows available bikes and empty slots
- Provides direct link to station location on Google Maps

## License

This project is licensed under the MIT License.
