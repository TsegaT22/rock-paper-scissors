export default function ComputerThrowi({ choice, isAnimating }){
    return (
        <div className="computer-throw">
            <h2>Computer Throw</h2>
            <img
                src={
                    isAnimating
                    ? "/images/question-mark.PNG"
                    : choice
                    ? `/images/${choice}.PNG`
                    : "/images/question-mark.PNG"
                }
                alt={choice || "?"}
                className={isAnimating ? "animate" : ""}
                />
            </div>
    )
}