import React, { useState, useEffect } from 'react'
import PersonForm from './PersonForm '
import Persons from './Persons'
import Filter from './Filter'
import Notification from './Notification'
import { getAll, addContact, updateNumber, deleteContact } from '../services/persons';


const App = () => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState({ text: null, type: '' })

    useEffect(() => {
        getAll().then(data => setPersons(data))
    }, [])

    const handleSubmit = e => {
        e.preventDefault() // Prevent default action of submitting HTML forms
        const personObj = { name: newName, number: newNumber }

        const duplicated = persons.find(({ name }) => name === newName)
        if (duplicated) {
            const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if (confirm) {
                updateNumber(duplicated.id, personObj)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => (person.name === newName) ? returnedPerson : person))
                        setNewName("")
                        setNewNumber("")
                        setMessage({ text: `Updated ${newName} successfully`, type: 'success' })
                        setTimeout(() => setMessage({ text: null, type: '' }), 3000)
                    }).catch(() => {
                        setMessage({ text: `Information of ${newName} has already been removerd from the server`, type: 'error' })
                        setTimeout(() => setMessage({ text: null, type: '' }), 3000)
                    })
            }
            return
        }

        addContact(personObj).then(returnedPerson => {
            setPersons([...persons, returnedPerson])
            setNewName("")
            setNewNumber("")
        })

        setMessage({ text: `Added ${newName}`, type: 'success' })
        setTimeout(() => setMessage({ text: null, type: '' }), 3000)
    }

    const handleDelete = (id, name) => {
        const confirm = window.confirm(`Delete ${name} ?`)
        if (confirm) {
            deleteContact(id).then(() => {
                const newPersons = persons.filter(person => person.id !== id)
                setPersons(newPersons)
            }).catch(e => console.log(e))
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Filter filter={filter} setFilter={setFilter} />
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
                persons={persons}
                setPersons={setPersons}
                handleSubmit={handleSubmit}
            />
            <Persons setPersons={setPersons} persons={persons} filter={filter} handleDelete={handleDelete} />
        </div>
    )
}

export default App