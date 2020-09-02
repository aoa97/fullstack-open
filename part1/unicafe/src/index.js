import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = (props) => {
  const { good, neutral, bad, all, average, positive } = props
  return (
    <div>
      {
        (good === 0 && neutral === 0 && bad === 0 && all === 0 && average === 0 && positive === 0) ?
          <p>No feedback given</p>
          : (
            <div>
              <h1>statistics</h1>
              <table>
                <tbody>
                  <Statistic text="good" value={good} />
                  <Statistic text="neutral" value={neutral} />
                  <Statistic text="bad" value={bad} />
                  <Statistic text="all" value={all} />
                  <Statistic text="average" value={average} />
                  <Statistic text="positive" value={positive + " %"} />
                </tbody>
              </table>
            </div>
          )
      }</div>
  )
}


const App = () => {
  // Clicks
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // Statistics
  const all = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / all || 0
  const positive = (good * 100) / all || 0

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))