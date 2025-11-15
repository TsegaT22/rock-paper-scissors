import { useState, useEffect } from 'react'
import PlayerThrow from './components/PlayerThrow';
import ComputerThrow from './components/ComputerThrow';
import ResultDisplay from './components/ResultDisplay';
import ScoreBoard from './components/ScoreBoard';
import ResetButton from './components/ResetButton';
import './App.css';

function App() {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState("")
  const [isAnimating, setIsAnimating] = useState(false);
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 })
  
  const choices = ["rock", "paper", "scissors"]
  //Deals with the animation of the shuffle and conducts the computer's throw
  useEffect(() => {
    if (!playerChoice) return;

    setIsAnimating(true);
    let cycleIndex = 0;
    const shuffle = setInterval(() => {
      setComputerChoice(choices[cycleIndex])
      cycleIndex = (cycleIndex + 1) % choices.length;
    }, 500)

    //Ends shuffle after three seconds
    const finish = setTimeout(() => {
      clearInterval(shuffle);
      const finalChoice = choices[Math.floor(Math.random() * 3)]
      setComputerChoice(finalChoice)
      setIsAnimating(false)
      chooseWinner(playerChoice, finalChoice)
    }, 3000)

    return () => {
      clearInterval(shuffle);
      clearTimeout(finish);
    };
  }, [playerChoice])

  // Logic for determining the winner
    const chooseWinner = (player, computer) => {
        if (player === computer){
            setResult("It's a tie!")
            setScore(s => ({...s, ties: s.ties + 1}))
        } else if (
            (player === "rock" && computer === "scissors") ||
            (player === "paper" && computer === "rock") ||
            (player === "scissors" && computer === "paper")
        ){
            setResult("You won the game!!")
            setScore(s => ({...s, wins: s.wins + 1}))
        }else{
            setResult("You lost this time. I'm disappointed in you.")
            setScore(s => ({...s, losses: s.losses + 1}))
        }
        }
        // Sets reset button which resets game
        const resetGame = () => {
            setPlayerChoice(null)
            setComputerChoice(null)
            setResult("")
            setScore({wins: 0, losses: 0, ties: 0})
        }
        return (
              <div className= "App">
                  <h1>Rock, Paper, Scissors, Shoot!</h1>
                  <PlayerThrow onSelect={setPlayerChoice} selected={playerChoice} />
                  <ComputerThrow choice={computerChoice} />
                  <ResultDisplay result={result} />
                  <ScoreBoard score={score} />
                  <ResetButton onReset={resetGame} />
              </div>
        
          )

}

export default App
