import '../styles/css/App.css';
import React, { useState } from 'react';
import Header from '../components/Header'
import Carousel from '../components/Carousel';
import { useSelector } from 'react-redux';

export default function App() {

  //TODO: finish convert state with redux

  const {page} = useSelector(store => store.header);
  //user verification to be added in the future
  const [user, setUser] = useState({name: 'name' , profileImg: ''});

  return (
    <div className="App">
      <Header userName={user.name}/>
      <div className='main-car-cont'>
        <Carousel media={{type: page, genre: 'Popular' }}/>
        <Carousel media={{type: page, genre: 'Comedy' }}/>
        {/*different genre keys for series in API*/}
        <Carousel media={{type: page, genre: page === 'movies'? 'Action' : 'Action & Adventure' }}/> 
        <Carousel media={{type: page, genre: page === 'movies'? 'Romance' : 'Drama'}}/>
        <Carousel media={{type: page, genre: page === 'movies'? 'Horror' : 'Crime' }}/>
      </div>
    </div>
  );
}