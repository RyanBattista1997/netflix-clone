import '../styles/css/MobileMenu.css'
import searchIcon from '../images/search.svg';
import { useSelector , useDispatch } from 'react-redux/es/exports';
import { useEffect, useRef } from 'react';
import { getSearchResults, setSearchValue } from '../features/headerSlice';


export default function MobileMenu(props) {

    const {content} = props;
    const {searchBarValue, searchResults, resultsLoaded} = useSelector(store => store.header);
    const dispatch = useDispatch();
    const timeoutRef = useRef(null);

    useEffect(() => {
        //limit api requests while not debouncing input value
        lazyUpdate()
    },[searchBarValue])


    const lazyUpdate = debounce(() => dispatch(getSearchResults(searchBarValue)), 250)

    function debounce(cb, delay = 250) {
        
        return (...args) => {
        //inital ref isn't a timeout function
        if(timeoutRef.current !== null){
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            cb(...args)
        }, delay)
        }
    }

    const mobResultCompArr = searchResults.map(element => {
        if(element !== undefined) {
            return (<li className='mobile-result-li'>{element}</li>)
        }
    })

    if(content ==='search') {
        return(
            <content className='mob-menu-cont'>
                <div className='mob-search-bar'>
                    <img src= {searchIcon} loading='lazy' alt='search icon' />
                    <input 
                        className='mob-input'
                        spellCheck='false' 
                        value={searchBarValue}
                        placeholder='Movies, Series, people...'
                        onChange={e => dispatch(setSearchValue(e.target.value))}
                        />
                </div>
                <ul className='mob-search-results'>
                    {resultsLoaded && mobResultCompArr}
                </ul>
            </content>
        )
    }  
}