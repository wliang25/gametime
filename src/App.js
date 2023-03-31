import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const MAXDISPLAYED = 3;
  const [searchValue, setSearchValue] = useState('');
  const [events, setEvents] = useState([]);
  const [performers, setPerformers] = useState([]);
  const [venues, setVenues] = useState([]);
  useEffect(() => {
    fetch(`https://mobile-staging.gametime.co/v1/search?q=${searchValue}`)
      .then(response => response.json())
      .then(data => {
        const { events, performers, venues } = data;
        setEvents(events.slice(0, MAXDISPLAYED));
        setPerformers(performers.slice(0, MAXDISPLAYED));
        setVenues(venues.slice(0, MAXDISPLAYED));
      });
  }, [searchValue]);

  const searchResult = (id, image, title, subtitle) => (
    <div key={id} className='search-result'>
      <span className='img-container'><img src={image} alt={title} /></span>
      <div className='result-info'>
        <div className='title'>{title}</div>
        <div className='subtitle'>{subtitle}</div>
      </div>
    </div>
  );

  return (
    <div className="App">
      <h1>GAMETIME</h1>
      <div className='search-container'>
        <input 
        type="text" 
        value={searchValue} 
        onChange={(input) => {
          const value = input.target.value;
          setSearchValue(value);
        }} 
        />
        <div className='search-results'>
          {searchValue && events?.map((event) => {
            const name = event.event.name;
            const img = event.performers[0].hero_image_url;
            const subtitle = event.venue.name;
            return searchResult(event.event.id, img, name, subtitle);
          })}
          {searchValue && performers?.map((performer) => {
            return searchResult(
              performer.id, 
              performer.hero_image_url, 
              performer.name,
              performer.category,
            );
          })}
          {searchValue && venues?.map((venue) => {
            return searchResult(
              venue.id,
              venue.image_url,
              venue.name,
              venue.city,
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
