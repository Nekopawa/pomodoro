import { useEffect, useState } from "react";
import "./App.css";
import TimerDisplay from "./components/TimerDisplay.jsx";
import ModeSelector from "./components/ModeSelector.jsx";
import TimerControls from "./components/TimerControls.jsx";

function App() {
    const MODES = {
        pomodoro: 1500,
        "short-break": 300,
        "long-break": 900,
    };

    const [mode, setMode] = useState("pomodoro");
    const [timeLeft, setTimeLeft] = useState(MODES["pomodoro"]);
    const [isRunning, setIsRunning] = useState(false);

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
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRunning]);

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
