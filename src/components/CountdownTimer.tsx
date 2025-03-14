
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type CountdownTimerProps = {
  targetDate: Date;
  className?: string;
  eventName: string;
};

const CountdownTimer = ({ targetDate, className, eventName }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        // Check if event is happening now (assuming events last 2 hours)
        const eventEndTime = new Date(targetDate.getTime() + 2 * 60 * 60 * 1000);
        if (new Date() < eventEndTime) {
          setIsLive(true);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        } else {
          setIsLive(false);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      }

      setIsLive(false);
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div className={cn("f1-panel", className)}>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">
        {isLive ? "ACONTECENDO AGORA" : "PRÓXIMO EVENTO"}
      </h3>
      <h2 className="text-lg font-bold mb-3">{eventName}</h2>
      
      {isLive ? (
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-f1-red animate-pulse"></div>
          <span className="text-f1-red font-medium">AO VIVO</span>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col items-center">
            <div className="text-xl font-mono font-bold">{formatNumber(timeLeft.days)}</div>
            <div className="text-xs text-muted-foreground uppercase">dias</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xl font-mono font-bold">{formatNumber(timeLeft.hours)}</div>
            <div className="text-xs text-muted-foreground uppercase">horas</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xl font-mono font-bold">{formatNumber(timeLeft.minutes)}</div>
            <div className="text-xs text-muted-foreground uppercase">min</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xl font-mono font-bold">{formatNumber(timeLeft.seconds)}</div>
            <div className="text-xs text-muted-foreground uppercase">seg</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
