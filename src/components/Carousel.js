import '../styles/css/Carousel.css'
import CarouselImage from './CarouselImage'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';

export default function Carousel(props) {

    const FILMS_PER_CAROUSEL = 13;
    const MAX_SCROLLS = 5;
    const {page} = useSelector(store => store.header)

    const [position, setPosition] = useState({current: 0, max: FILMS_PER_CAROUSEL })
    const [genreState, setGenreState] = useState({gen: '' , loaded: false})

    const genreEffect = useEffect(() => {
        //props.media.genre is a string
        genre(props.media.genre)
    },[props])

    //handles image array order
    const getImageArr = (position) => {

        const imageCompArr = [];
        for(let i = position; i <= FILMS_PER_CAROUSEL; i++) {
            imageCompArr.push(<CarouselImage index = {`${i}`} genreID={genreState.gen} />)
        }
        //add images to the end for loop effect
        if(position >= MAX_SCROLLS) {
            for(let i = 0 ; i <= position; i++) {
                imageCompArr.push(<CarouselImage index = {`${i}`} genreID={genreState.gen}/>)
            } 
        }
        return imageCompArr
    }
    
    const genre = async (key) => {
        //get genre list first
        const mediaKeys = {
            'movies': 'movie',
            'series': 'tv',
            'originals': ''
        }
        
        const res = await fetch(`https://api.themoviedb.org/3/genre/${mediaKeys[page]}/list?api_key=e72588d9f899e406d4daa18b5e7b1b00&language=en-US`);
        const data = await res.json();
        const genreArray = data.genres;
        setGenreState({gen: getID(genreArray, key), loaded:true})
    }
    
    function handleArrowClick(e) {
        
        if(e.target.className === 'arrow-btn-left') {
            setPosition( prevPosition => {
                return {...prevPosition,
                     current: prevPosition.current === 0 ? prevPosition.max : prevPosition.current - 1}
            })
        }
        if(e.target.className === 'arrow-btn-right') {
            setPosition( prevPosition => {
                return {...prevPosition,
                     current: prevPosition.current === prevPosition.max ? 0 : prevPosition.current + 1}
            }) 
        }
    }

    return (
        <div className='carousel-comp'>
            <span className='carou-desc'>{`${props.media.genre} ${page}`}</span>
            <div className='scroller'>
                <button className='arrow-btn-left' onClick={handleArrowClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 22.8 44`} className='arrow-icon'>
                        <path d="M20 44 0 24 20 4l2.8 2.85L5.65 24 22.8 41.15Z"/>
                    </svg>
                </button>
                <div className="carousel-img-cont">
                    {genreState.loaded && getImageArr(position.current)}
                </div>
                <button className='arrow-btn-right' onClick={handleArrowClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox='11.4 0 22.8 44' className='arrow-icon'>
                        <path d="m15.2 43.9-2.8-2.85L29.55 23.9 12.4 6.75l2.8-2.85 20 20Z"/>
                    </svg>
                    
                </button>
            </div>
        </div>
    )
}

//utility, takes array of objects & key then returns genre ID
function getID(arr, key) {
    let id;
    arr.forEach((element, index, array) => {
        if(array[index].name === key){
            id = array[index].id
            return
        } 
    });
    return id
}