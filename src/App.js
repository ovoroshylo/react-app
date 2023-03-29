import React from 'react';
import './App.css';
import separate from './components/separate';
import Data from './components/Data';
import Count from './components/Count';
import Die from './components/Die';
import {nanoid} from 'nanoid'
// import Confetti from 'react-confetti'

function App() {
  const dataCollection = separate.map(data => {
    return (
      <Data 
        item = {data}
      />
    )
  })
  
  const [isImportant, setIsImportant] = React.useState({
    flag: true,
    firstName: "John"
  })
  function handleClick() {
    setIsImportant(pre => {
      return {
        ...pre,
        flag: !isImportant.flag
      }
    })
  }
  const [count, setCount] = React.useState(0)
  function add(){
    setCount(preCount => preCount + 1)
  }
  function subtract(){
    setCount(preCount => preCount - 1)
  }

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
    }

  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const newDice = []
    for(let i = 0; i < 10; i ++){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
          die : 
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }
  //choose the dice whatever you want.
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} : 
        die
    }))
  }
  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ))

  return (
    <div className='App'>
      {dataCollection}
      <div onClick={handleClick}>
        <h1>{isImportant.flag ? "Yes" : "No"}</h1>
      </div>
      <div>
        <button onClick={subtract}>-</button>
        <Count number={count} />
        <button onClick={add}>+</button>
      </div>
      <div className='main'>
        <div className='container'>
          {/* {tenzies && <Confetti/>} */}
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='dice-container'>
            {diceElements}
          </div>
          <button className='roll-dice' onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
