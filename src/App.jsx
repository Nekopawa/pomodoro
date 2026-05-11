import { useState } from "react";
import "./App.css";
import TimerDisplay from "./components/TimerDisplay.jsx";
import ModeSelector from "./components/ModeSelector.jsx";
import TimerControls from "./components/TimerControls.jsx";

function App() {
    const [mode, setMode] = useState("pomodoro");
    const [timeLeft, setTimeLeft] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);

    const MODES = {
        pomodoro: 1500,
        "short-break": 300,
        "long-break": 900,
    };

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

    return (
        <main id="timer__container">
            <h1>Pomodoro timer</h1>
            <ModeSelector selectedMode={mode} onChangeMode={handleChangeMode} />
            <TimerDisplay timeLeft={timeLeft} />
            <TimerControls
                onStart={handleStartTimer}
                onPause={handlePauseTimer}
                onReset={handleResetTimer}
            />
        </main>
    );
}

export default App;
