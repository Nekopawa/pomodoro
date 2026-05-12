import { useEffect, useState } from "react";
import "./App.css";
import TimerDisplay from "./components/TimerDisplay.jsx";
import ModeSelector from "./components/ModeSelector.jsx";
import TimerControls from "./components/TimerControls.jsx";

const MODES = {
    pomodoro: 1500,
    "short-break": 300,
    "long-break": 900,
};

function App() {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("mode")
            ? localStorage.getItem("mode")
            : "pomodoro";
    });
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTimeLeft = Number(localStorage.getItem("timeLeft"));
        return savedTimeLeft ? savedTimeLeft : MODES["pomodoro"];
    });
    const [isRunning, setIsRunning] = useState(false);
    const [sessionCount, setSessionCount] = useState(() => {
        return localStorage.getItem("sessionCount")
            ? Number(localStorage.getItem("sessionCount"))
            : 0;
    });

    function handleChangeMode(newMode) {
        setMode(newMode);
        setIsRunning(false);
        setTimeLeft(MODES[newMode]);
    }

    function handleStartTimer() {
        setIsRunning(true);
    }

    function handlePauseTimer() {
        setIsRunning(false);
    }

    function handleResetTimer() {
        setIsRunning(false);
        setTimeLeft(MODES[mode]);
    }

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                //garantees time will never be negative
                setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRunning]);

    useEffect(() => {
        localStorage.setItem("timeLeft", timeLeft);
    }, [timeLeft]);

    useEffect(() => {
        localStorage.setItem("mode", mode);
    }, [mode]);

    useEffect(() => {
        localStorage.setItem("sessionCount", sessionCount);
    }, [sessionCount]);

    useEffect(() => {
        if (!isRunning) return;

        if (timeLeft <= 0) {
            setIsRunning(false);
            const nextSessionCount =
                mode === "pomodoro" ? sessionCount + 1 : sessionCount;
            let nextMode;

            if (nextSessionCount > 0 && nextSessionCount % 4 === 0) {
                setSessionCount(0);
                nextMode = "long-break";
            } else {
                setSessionCount(nextSessionCount);
                nextMode = "short-break";
            }
            setMode(nextMode);
            setTimeLeft(MODES[nextMode]);
        }
    }, [timeLeft, isRunning, sessionCount, mode]);

    return (
        <main id="timer__container">
            <h1>Pomodoro timer</h1>
            <ModeSelector selectedMode={mode} onChangeMode={handleChangeMode} />
            <TimerDisplay timeLeft={timeLeft} />
            <TimerControls
                isRunning={isRunning}
                onStart={handleStartTimer}
                onPause={handlePauseTimer}
                onReset={handleResetTimer}
            />
        </main>
    );
}

export default App;
