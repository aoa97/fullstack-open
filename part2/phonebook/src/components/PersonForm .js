import React, { useState } from 'react'
import { addContact, updateNumber } from '../services/persons';

const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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
                    })
            }
            return
        }

        addContact(personObj).then(returnedPerson => {
            setPersons([...persons, returnedPerson])
            setNewName("")
            setNewNumber("")
        })
    }

    return (
        <div>
            <h2>add a new</h2>
            <form>
                <div>name: <input value={newName} onChange={e => setNewName(e.target.value)} /></div>
                <div>number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} /></div>
                <div>
                    <button type="submit" onClick={handleSubmit}>add</button>
                </div>
            </form>
        </div>
    );
}

export default PersonForm;