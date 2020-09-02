import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  })
  const [most, setMost] = useState({
    value: 0,
    index: 0
  })

  const handleVoting = () => {
    const votesCopy = { ...votes } // Capture a copy of state so that I could update it
    votesCopy[selected] += 1
    setVotes(votesCopy)

    const arr = Object.values(votesCopy)
    const value = Math.max(...arr)
    const index = arr.indexOf(value)
    setMost({ value, index })
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{props.anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={handleVoting}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * 5))}>next anecdotes</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{props.anecdotes[most.index]}</p>
        <p>has {most.value} votes</p>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)