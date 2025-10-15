import { Sun, Cloud, CloudRain, CloudDrizzle, CloudSnow } from "lucide-react";

interface WeatherIconProps {
  condition: string;
  className?: string;
}

const WeatherIcon = ({ condition, className = "h-8 w-8" }: WeatherIconProps) => {
  const getIcon = () => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
      return <Sun className={`${className} text-accent`} />;
    }
    if (conditionLower.includes("rain")) {
      return <CloudRain className={`${className} text-primary`} />;
    }
    if (conditionLower.includes("drizzle")) {
      return <CloudDrizzle className={`${className} text-primary`} />;
    }
    if (conditionLower.includes("snow")) {
      return <CloudSnow className={`${className} text-primary`} />;
    }
    if (conditionLower.includes("cloud")) {
      return <Cloud className={`${className} text-muted-foreground`} />;
    }
    
    return <Sun className={`${className} text-accent`} />;
  };

  return getIcon();
};

export default WeatherIcon;
