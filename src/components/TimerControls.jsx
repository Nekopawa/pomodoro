function TimerControls({ isRunning, onStart, onPause, onReset }) {
    return (
        <section id="timer-controls__container">
            <button id="button_start" onClick={onStart} disabled={isRunning}>
                Start
            </button>
            <button id="button_pause" onClick={onPause}>
                Pause
            </button>
            <button id="button_reset" onClick={onReset}>
                Reset
            </button>
        </section>
    );
}

export default TimerControls;
