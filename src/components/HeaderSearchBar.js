import '../styles/css/HeaderSearchBar.css'
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { setSearchValue, clearSearch, getSearchResults , toggleResults} from '../features/headerSlice';

export default function HeaderSearchBar() {

    const {searchBarValue, resultsLoaded, searchResults } = useSelector(store => store.header)
    const dispatch = useDispatch();
    //timeout ref stops mutliple timeouts being created on multiple change events
    const timeoutRef = useRef(null);
    //ref instead of state so re-render doesn't interrupt transition
    const inputRef = useRef(null);
    const searchContainerRef = useRef(null);
    const resultsRef = useRef(null);

      
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

    function searchClickHandler(e) {
        if(e.target.className === 'search-bar') {
            if(inputRef.current.style.width === '30vw') {
                console.log('yo')
                dispatch(clearSearch())
                dispatch(toggleResults())
            }
            inputRef.current.style.width 
                = inputRef.current.style.width === '0px' ? '30vw' : '0px';
            searchContainerRef.current.style.border 
                = searchContainerRef.current.style.border === 'none' ? 'solid 1px white' : 'none';
            resultsRef.current.style.borderBottom 
                = resultsRef.current.style.borderBottom === 'none' ? 'solid 1px white' : 'none'
        }
    }

    const resultCompArr = searchResults.map(element => {
        if(element !== undefined) {
            return (<li>{element}</li>)
        }
    })
    
    return (
        <div className='search-bar' ref={searchContainerRef}  style={{border: 'none'}} onClick = {searchClickHandler}  >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 40 40' >
                <path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"/>
            </svg>
            <input type='text' 
                placeholder='Titles, People, genres...' 
                spellCheck="false"
                style={{width: '0px'}}
                ref={inputRef} 
                value={searchBarValue}
                onChange={(e) => dispatch(setSearchValue( e.target.value))}
                />
            <div className='results-dd' ref={resultsRef} style= {{borderBottom: 'none'}}>
                <ul>
                    {resultsLoaded && resultCompArr}
                </ul>
            </div>
        </div>
    )
}