import React, { useState, useEffect } from 'react';

export default function Countdown ({
    maxWidth, startDateTime, endDateTime
}) {
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isExpired, setIsExpired] = useState(false);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();
            if (now < startDateTime.getTime()) {
                setIsActive(false);
            } else {
                setIsActive(true);
            }
            const endTimeMs = endDateTime.getTime();
            const remaining = Math.max(0, endTimeMs - now);
            setTimeRemaining(remaining);
            setIsExpired(now >= endTimeMs);
        }, 1000);
    
        return () => clearInterval(timer);
      }, [startDateTime, endDateTime]);


    
    const calculateProgress = () => {
        const totalDuration =  endDateTime.getTime() - startDateTime.getTime();
        const elapsedTime = Math.max(0, totalDuration - timeRemaining);
        if (!isActive) {
            return 0;
        }
        return isExpired ? 0 : maxWidth - (elapsedTime / totalDuration) * maxWidth;
    };

    const formatTime = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        const hourText = hours === 1 ? "hr" : "hrs";
        const minsText = minutes === 1 ? "min" : "mins";
        const secsText = seconds === 1 ? "sec" : "secs";
        if (!isActive) {
            return 'Auction has not started';
        } 
        return isExpired ? 'Auction has ended' : `${hours} ${hourText} ${minutes} ${minsText} ${remainingSeconds} ${secsText}`;
    };

    return (           
        <div className="float-right text-right" style={{margin: 15}}>
            <div className="mb-2">{formatTime(timeRemaining)}</div>
            <div className="h-[11px] bg-progress-bar rounded-lg overflow-hidden" style={{width: maxWidth, float: 'right'}}>
                <div className="h-full bg-mv-green rounded-lg" style={{width: calculateProgress(), float: 'right'}}/>
            </div>
        </div>
    );
};



