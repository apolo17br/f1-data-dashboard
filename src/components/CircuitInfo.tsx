
import { useState } from "react";

// Define type for circuit information
type CircuitProps = {
  name: string;
  location: string;
  country: string;
  length: string;
  turns: number;
  lapRecord: {
    time: string;
    driver: string;
    year: number;
  };
  firstGP: number;
  image: string;
  className?: string;
};

const CircuitInfo = ({ 
  name, 
  location, 
  country, 
  length, 
  turns, 
  lapRecord, 
  firstGP, 
  image,
  className 
}: CircuitProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`f1-card ${className}`}>
      <div className="relative overflow-hidden h-36">
        <div className={`absolute inset-0 backdrop-blur-sm ${imageLoaded ? '' : 'bg-muted animate-pulse'}`}></div>
        <img
          src={image}
          alt={`${name} circuit layout`}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-f1-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="font-bold text-white text-xl">{name}</h3>
          <p className="text-white/80 text-sm">{location}, {country}</p>
        </div>
      </div>
      
      <div className="p-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">COMPRIMENTO</p>
          <p className="font-medium">{length}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">CURVAS</p>
          <p className="font-medium">{turns}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">PRIMEIRO GP</p>
          <p className="font-medium">{firstGP}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">VOLTA RECORDE</p>
          <p className="font-medium">{lapRecord.time}</p>
          <p className="text-xs text-muted-foreground">{lapRecord.driver} ({lapRecord.year})</p>
        </div>
      </div>
    </div>
  );
};

export default CircuitInfo;
