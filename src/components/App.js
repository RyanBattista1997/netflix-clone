import '../styles/css/App.css';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import Carousel from '../components/Carousel';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import {setMatchesMob, setMatchesTab } from '../features/headerSlice'

export default function App() {

  const {page, matchesTab} = useSelector(store => store.header);
  const dispatch = useDispatch();
  //user verification to be added in the future
  const [user, setUser] = useState({name: 'name' , profileImg: ''});


  useEffect(() => {
    dispatch(setMatchesMob(window.matchMedia("(max-width: 700px)").matches));
    dispatch(setMatchesTab(window.matchMedia("(max-width: 1100px)").matches));
    window
    .addEventListener('resize', () => {
      dispatch(setMatchesMob(window.matchMedia("(max-width: 700px)").matches));
      dispatch(setMatchesTab(window.matchMedia("(max-width: 1100px)").matches));
    })

  }, []);
  
  return (
    <>
      <Header userName={user.name}/>
      <div className='main-car-cont'>
        <Carousel media={{type: page, genre: 'Popular' }}/>
        <Carousel media={{type: page, genre: 'Comedy' }}/>
        {/*different genre keys for series in API*/}
        <Carousel media={{type: page, genre: page === 'movies'? 'Action' : 'Action & Adventure' }}/> 
        <Carousel media={{type: page, genre: page === 'movies'? 'Romance' : 'Drama'}}/>
        <Carousel media={{type: page, genre: page === 'movies'? 'Horror' : 'Crime' }}/>
      </div>
      {matchesTab && <Footer />}
    </>
  );
}