import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country';

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(({ data }) => setCountries(data))
  })

  const filtered = countries.filter(({ name }) => name.includes(search.charAt(0).toUpperCase() + search.slice(1))) || []
  const list = filtered.map((country) => (<div key={country.numericCode}>{country.name} <button onClick={() => setQuery(country)}>show</button></div>))

  return (
    <div>
      <div>
        Find Countries <input value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <Country filtered={filtered} list={list} query={query} />
    </div>
  )
}

export default App