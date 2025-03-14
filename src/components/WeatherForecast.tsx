
import { Cloud, CloudRain, Cloudy, Sun, Wind } from "lucide-react";

type WeatherCondition = "sunny" | "cloudy" | "partly-cloudy" | "rainy" | "windy";

type WeatherDay = {
  day: string;
  condition: WeatherCondition;
  temperature: {
    min: number;
    max: number;
  };
  precipitation: number;
  windSpeed: number;
};

type WeatherForecastProps = {
  location: string;
  forecast: WeatherDay[];
  className?: string;
};

const WeatherIcon = ({ condition }: { condition: WeatherCondition }) => {
  switch (condition) {
    case "sunny":
      return <Sun className="h-6 w-6 text-amber-500" />;
    case "cloudy":
      return <Cloud className="h-6 w-6 text-gray-500" />;
    case "partly-cloudy":
      return <Cloudy className="h-6 w-6 text-gray-400" />;
    case "rainy":
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    case "windy":
      return <Wind className="h-6 w-6 text-blue-300" />;
  }
};

const WeatherForecast = ({ location, forecast, className }: WeatherForecastProps) => {
  return (
    <div className={`f1-card ${className}`}>
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-bold">Previsão do Tempo</h3>
        <p className="text-xs text-muted-foreground">{location}</p>
      </div>
      <div className="p-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {forecast.map((day, index) => (
            <div 
              key={index} 
              className="p-3 rounded-lg transition-all hover:bg-secondary/50 text-center"
            >
              <p className="text-sm font-medium mb-2">{day.day}</p>
              <div className="flex justify-center mb-2">
                <WeatherIcon condition={day.condition} />
              </div>
              <p className="font-medium text-sm">
                {day.temperature.max}° <span className="text-muted-foreground">{day.temperature.min}°</span>
              </p>
              <div className="mt-2 text-xs text-muted-foreground">
                <p>Chuva: {day.precipitation}%</p>
                <p>Vento: {day.windSpeed} km/h</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
