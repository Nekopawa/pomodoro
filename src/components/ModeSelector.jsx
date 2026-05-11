function ModeSelector({ selectedMode, onChangeMode }) {
    function isSelected(mode) {
        return selectedMode === mode ? "underline" : "none";
    }

    return (
        <section id="mode__selector">
            <ul>
                <li
                    style={{
                        textDecoration: isSelected("pomodoro"),
                    }}
                    onClick={() => onChangeMode("pomodoro")}
                >
                    Pomodoro
                </li>
                <li
                    style={{
                        textDecoration: isSelected("short-break"),
                    }}
                    onClick={() => onChangeMode("short-break")}
                >
                    Short break
                </li>
                <li
                    style={{
                        textDecoration: isSelected("long-break"),
                    }}
                    onClick={() => onChangeMode("long-break")}
                >
                    Long break
                </li>
            </ul>
        </section>
    );
}

export default ModeSelector;
