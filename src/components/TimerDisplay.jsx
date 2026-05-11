function TimerDisplay({ timeLeft }) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = (timeLeft % 60).toString().padStart(2, "0");

    const formattedTime = `${minutes}:${seconds}`;

    return (
        <section>
            <p id="timer__text">{formattedTime}</p>
        </section>
    );
}

export default TimerDisplay;
