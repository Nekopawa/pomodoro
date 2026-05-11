function TimerControls({ onStart, onPause, onReset }) {
    return (
        <section id="timer-controls__container">
            <button id="button_start" onClick={onStart}>
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
