import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

interface RateLimitAlertProps {
  message: string;
  code: string;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RateLimitAlert({
  message,
  code,
  setAlert,
}: RateLimitAlertProps) {
  const [errorMessage, timeLeftMessage] = message.toString().split("|");
  const [RemainingTime, setRemainingTime] = useState(Number(timeLeftMessage));

  useEffect(() => {
    // Update the remaining time every second
    const intervalId = setInterval(() => {
      setRemainingTime(RemainingTime - 1);
    }, 1000);
    if (RemainingTime === 0) {
      setAlert(false);
    }
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  });

  return (
    <div dir="ltr">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-5" />
        <AlertTitle>{code}</AlertTitle>
        <AlertDescription className="flex flex-col">
          <div>
            <h1>{errorMessage}</h1>
            {!!RemainingTime ?? <h1>Time Left: {RemainingTime} seconds</h1>}
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
