import '../App.css';
import React from 'react';
import Flight from './Flight'

function Results(props) {

    const {flights,hasOthers,next} = props

    // if (flights==0) {
    //     <p>No can show, mate</p>
    // }

    if (hasOthers) return (
        <div className="Results">
            {flights.map((f,i) => (
                <Flight flight={f} key={i}/>
            ))}
            <button onClick={next}>NEXT!</button>
        </div>
    );

    return (
        <div className="Results">
            {flights.map((f,i) => (
                <Flight flight={f} key={i}/>
            ))}
        </div>
    );
}

export default Results;