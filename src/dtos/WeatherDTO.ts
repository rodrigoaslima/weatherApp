export interface WeatherDTO{
    country: string;
    id: number;
    name: string;
    temperature:{
      feels_like: number;
      humidity: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    weather:{
      description: string;
      icon: string;
      main: string;
    };
    windSpeed: number;
}


