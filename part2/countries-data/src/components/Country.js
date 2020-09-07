import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({ filtered, list, query, setQuery }) => {
    const [weather, setWeather] = useState({})

    if (filtered.length === 1 || query.name) {
        const { name, capital, population, languages, flag } = filtered[0] || query
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
            .then((res) => setWeather(res.data.current))
        return (
            <div>
                <div>
                    <h1>{name}</h1>
                    <p>capital {capital}</p>
                    <p>population {population}</p>
                    <h2>Spoken languages</h2>
                    <ul>
                        {languages.map(({ name, iso639_1 }) => <li key={iso639_1}>{name}</li>)}
                    </ul>
                    <img src={flag} width={200} height={200} alt={name + " 's flag"} />
                </div>
                <div>
                    <h2>Weather in {capital}</h2>
                    <h3>temperature: {weather.temperature || 0}</h3>
                    <img src='https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png' alt="Weather Icon" />
                    <h3>Wind: {weather.wind_speed || 0}kph direction: {weather.wind_dir || 0}</h3>
                </div>
            </div>
        )
    }
    else if (filtered.length === 250 || filtered.length === 0)
        return null
    else if (filtered.length >= 11)
        return <p>Too many matches, specify another filtered</p>
    else
        return <>{list}</>
}

export default Country;


