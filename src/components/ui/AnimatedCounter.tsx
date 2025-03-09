
import React, { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  precision?: number;
}

export function AnimatedCounter({ value, duration = 1000, precision = 0 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    const startValue = displayValue;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextValue = startValue + progress * (value - startValue);
      
      setDisplayValue(nextValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
    
    // Cleanup function
    return () => {
      startTime = null;
    };
  }, [value, duration]);
  
  return <>{displayValue.toFixed(precision)}</>;
}
