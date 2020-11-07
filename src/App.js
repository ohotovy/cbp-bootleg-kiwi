import './App.css';
import React, {useState, useEffect} from 'react';
import Results from './components/Results';
import Controls from './components/Controls';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { DateTime } from 'luxon';

function App() {

  const apiUrl = 'https://api.skypicker.com/flights?partner=picky&sort=price&asc=1'
  let tomorrow = new Date()
  const tomorrow_input = DateTime.fromMillis(tomorrow * 1).toFormat('dd/LL/yyyy')
  tomorrow = DateTime.fromMillis(tomorrow * 1).toFormat('d/L/y')
  


  const [searchParams,setSearchParams] = useState({date_from:tomorrow, date_to:tomorrow, fly_from:'PRG', fly_to:'VLC', direct_flights:0, date_from_input:tomorrow_input, date_to_input:tomorrow_input})
  const [searchResult,setSearchResult] = useState({data:[], route:['PRG','VLC'], hasOthers:false})
  const [currentLimit,setCurrentLimit] = useState(5)

  const fetchData = async (s) => {
    const {date_from, date_to, fly_from, fly_to, direct_flights} = searchParams
    const query = apiUrl
      +'&date_from='+date_from
      +'&date_to='+date_to
      +'&fly_from='+fly_from
      +'&fly_to='+fly_to
      +'&direct_flights='+direct_flights
      +'&limit='+currentLimit;
    // console.log(query)
    const response = await fetch(query)
    const rawData = await response.json()
    const data = rawData.data.slice(currentLimit-5,currentLimit)
    let hasOthers = false
    if(rawData._results > currentLimit) {
      hasOthers = true
    }
    if(rawData._results === 0) {
      setSearchResult({data: 'Nope', hasOthers:hasOthers}, console.log(searchResult.data))
    } else {
      searchParams && rawData && data && setSearchResult({...searchResult, data: data, hasOthers:hasOthers}, console.log(data))
    }
  }

  useEffect (() => {
    setSearchResult({...searchResult, data:[]})
    fetchData(searchParams,currentLimit)
  },[searchParams,currentLimit])

  const triggerSearch = () => {
    // setSearchResult({...searchResult, data:[]})
    const fly_from = document.getElementById('fly_from').value
    const fly_to = document.getElementById('fly_to').value
    let date_from = tomorrow
    console.log(document.getElementById('date_from').valueAsNumber)
    if (document.getElementById('date_from').valueAsNumber > 0) {
      date_from = DateTime.fromMillis(document.getElementById('date_from').valueAsNumber * 1).toFormat('d/L/y')
    }
    let date_to = tomorrow
    if (document.getElementById('date_to').valueAsNumber > 0) {
      date_to = DateTime.fromMillis(document.getElementById('date_to').valueAsNumber * 1).toFormat('d/L/y')
    }
    console.log(date_from)
    console.log(date_to)
    let direct_flights = 0
    if(document.getElementById('direct_flights').checked) {
      direct_flights = 1
    }
    console.log(direct_flights)
    setSearchParams({date_from:date_from, date_to: date_to, fly_from:fly_from, fly_to:fly_to, direct_flights:direct_flights})
  }

  const handleNext = () => {
    setCurrentLimit(currentLimit + 5)
  }

  if(searchResult.data == 0) {
    return (
      <div className="App">
        <Controls trigger={triggerSearch} fly_from={searchParams.fly_from} fly_to={searchParams.fly_to}/>
        <h2>We can't fly, but still doing what we can</h2>
        <img src="https://www.designbolts.com/wp-content/uploads/2013/08/Kiwi-Cachers-Animated-Logo-design.gif" alt="Fetching"/>
        <img src="https://www.designbolts.com/wp-content/uploads/2013/08/Kiwi-Cachers-Animated-Logo-design.gif" alt="Fetching"/>
        <img src="https://www.designbolts.com/wp-content/uploads/2013/08/Kiwi-Cachers-Animated-Logo-design.gif" alt="Fetching"/>
      </div>
    )
  } else if (searchResult.data == 'Nope') {
    return (
      <div className="App">
        <Controls trigger={triggerSearch} fly_from={searchParams.fly_from} fly_to={searchParams.fly_to} date_from_input={searchParams.date_from_input} date_to_input={searchParams.date_to_input}/>
        <br/>
        <img src="https://i.kym-cdn.com/entries/icons/original/000/028/596/dsmGaKWMeHXe9QuJtq_ys30PNfTGnMsRuHuo_MUzGCg.jpg" alt="Well yes, but actually no" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Controls trigger={triggerSearch} fly_from={searchParams.fly_from} fly_to={searchParams.fly_to}/>

        <Route path = '/' component={() =>
          <Results 
            flights={searchResult.data}
            hasOthers={searchResult.hasOthers}
            next={handleNext}
            />
        }
        />
        
      </div>
    </BrowserRouter>
  );
}

export default App;
