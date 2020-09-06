import React, { useState, useEffect } from 'react'
import PersonForm from './PersonForm '
import Persons from './Persons'
import Filter from './Filter'
import { getAll } from '../services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        getAll().then(data => setPersons(data))
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <PersonForm persons={persons} setPersons={setPersons} />
            <Persons setPersons={setPersons} persons={persons} filter={filter} />
        </div>
    )
}

export default App