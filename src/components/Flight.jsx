import '../App.css';
import React from 'react';

import { DateTime } from 'luxon';

function Flight(props) {

    const {flight} = props

    const dateConvert = (apiTime) => {
        return DateTime.fromMillis(apiTime * 1000).toFormat('L/d/y HH:mm')
    }

    return (
        <div className="App">
            From {flight.cityFrom} - {dateConvert(flight.dTimeUTC)} to {flight.cityTo} - {dateConvert(flight.aTimeUTC)} for {flight.price}EUR with {flight.route.length-1} stopovers
        </div>
    );
}

export default Flight;