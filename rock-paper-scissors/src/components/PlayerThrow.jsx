export default function PlayerThrow({ onSelect, selected}){
    const options = ["rock", "paper", "scissors"]
    return (
        <div className="player-throw">
            {options.map(opt => (
                <img
                key={opt}
                src={`/images/${opt}.PNG`}
                alt={opt}
                className={selected === opt ? "selected" : ""}
                onClick={() => onSelect(opt)}
                />
            ))}
        </div>
    )
}