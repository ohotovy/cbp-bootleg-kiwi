import '../App.css';
import React, {useState, useEffect} from 'react';

function Controls(props) {

    const {trigger, fly_from, fly_to,date_from_input,date_to_input} = props

    console.log(date_from_input)

    const[params, setParams] = useState({fly_from:fly_from,fly_to:fly_to,date_from_input:date_from_input,date_to_input:date_to_input})

    console.log(params.date_from_input)
    console.log(params.fly_from)

    return (
        <>
            <h1>My aviary</h1>
            From: <select name="fly_from" id="fly_from" value={params.fly_from} onChange={() => {setParams({...params, fly_from: document.getElementById('fly_from').value});}}>
                <option value="PRG">Prague</option>
                <option value="BER">Berlin</option>
                <option value="WMI">Warsaw</option>
                <option value="PED">Pardubice</option>
            </select> To: <select name="fly_to" id="fly_to" value={params.fly_to} onChange={() => {setParams({...params, fly_to: document.getElementById('fly_to').value});}}>
                <option value="VLC">Valencia</option>
                <option value="BCN">Barcelona</option>
                <option value="MAD">Madrid</option>
                <option value="LIN">Milano</option>
                <option value="ATH">Athens</option>
            </select>
            <br/>
            Between <input type="date" id="date_from" name="date_from" value={params.date_from_input}
                onChange={() => {setParams({...params, date_from_input: document.getElementById('date_from').value});}}
                >
                    </input> and <input type="date" id="date_to" name="date_to"></input>
            <br/>
            Stopovers? No, thank you! <input type="checkbox" name="direct_flights" id="direct_flights"/>
            <br/>
            <button onClick={trigger}>Fly, my pretties!</button>
            <hr/>
        </>
    );
}

export default Controls;