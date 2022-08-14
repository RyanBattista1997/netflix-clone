import React, {useState, useRef, useEffect} from "react"
import '../styles/css/CarouselImage.css'
import { useSelector } from "react-redux/es/hooks/useSelector"; 

export default function CarouselImage(props) {

    const timeoutRef = useRef(null);
    const IMAGE_HEIGHT = 210.75;
    const IMAGE_WIDTH = 375;
    const BACKUP_INDEX = 14;

    const {page} = useSelector(store => store.header)
    const [image, setImage] = useState({url: '', imgOf: ''});

    useEffect(() => {
        poster(props.index)
    },[props])

    function handleMouseEnter(e) {
        timeoutRef.current = setTimeout(() => {
            e.target.style.height = `calc(${IMAGE_HEIGHT}px * 0.85)`
            e.target.style.width =`calc(${IMAGE_WIDTH}px * 0.85)`
        },200)
        
    }
    function handleMouseLeave(e) {
        clearTimeout(timeoutRef.current)
        e.target.style.height = `calc(${IMAGE_HEIGHT}px * 0.6)`
        e.target.style.width =`calc(${IMAGE_WIDTH}px * 0.6)`
    }
    
    // 0 <= i < 20
    const poster = async (i) => {
        const media = page === 'movies'? 'movie' : 'tv'
        let hasPoster = true;
        const films = await getFilmByGenre(props.genreID, media);
        const backDrop = await films[i].backdrop_path;
        //checks if film has poster then provides back up if not
        if(backDrop === null){
            hasPoster = false;
        }
        const res = await fetch(`https://image.tmdb.org/t/p/w500/${films[hasPoster? i : BACKUP_INDEX].backdrop_path}`);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob)
        setImage(prevImage => { 
            return {...prevImage, url: imageObjectURL, imgOf: films[hasPoster? i : BACKUP_INDEX].id }
        })
    }

    return (
        <>
            <img src={`${image.url}`} loading='lazy' alt='carouselImage' 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
            />
        </>
    )
}

//takes genre id
async function getFilmByGenre(genre,type) {
    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/discover/${type}?api_key=e72588d9f899e406d4daa18b5e7b1b00&language=en-US&with_genres=${genre}&`
            );
        const data = await res.json();
        return data.results
    }
    catch(error) {
        console.log('failed request')
    }
}