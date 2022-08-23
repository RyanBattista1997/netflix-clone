import '../styles/css/MobileMenu.css'
import userImg from '../images/Default_Avatar.png';
import { useSelector , useDispatch } from 'react-redux/es/exports';
import { useEffect, useRef } from 'react';
import { getSearchResults, setSearchValue, setPage } from '../features/headerSlice';


export default function MobileMenu(props) {

    const {content, icons} = props;
    const {searchIcon, notiIcon, swapAcc} = icons;
    const {searchBarValue, searchResults, resultsLoaded, user, page} = useSelector(store => store.header);
    const dispatch = useDispatch();
    const timeoutRef = useRef(null);

    useEffect(() => {
        //limit api requests while not debouncing input value
        lazyUpdate()
    },[searchBarValue])

    const lazyUpdate = debounce(() => dispatch(getSearchResults(searchBarValue)), 250);

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

    function mobMenuClickHandler(e) {
        const {textContent} = e.target;
        if(textContent === 'Settings' || textContent === 'home' || textContent === null) {
            return
        }
        dispatch(setPage(textContent.toLowerCase()))
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

    if(content === 'menu') {
        return (
            <content className='mob-menu-cont'>
                <header>
                    <img src={userImg} alt='user avatar' loading='lazy' className='user-img' />
                    <span>{user.name}</span>
                    <img  src={swapAcc} alt='swap account' loading='lazy' className='swap-acc-img' />
                </header>
                <div className='mob-menu-noti'>
                    <title>
                        <img src={notiIcon} alt='notification icon' loading='lazy'/>
                        Notifications
                    </title>
                </div>
                <ul className='mob-link-li' onClick={mobMenuClickHandler}>
                    <li>Home</li>
                    <li>Recently Added</li>
                    <li data-active={page === 'movies'? true : false} >Movies</li>
                    <li data-active={page === 'series'? true : false} >Series</li>
                    <li data-active={page === 'originals'? true : false}>Originals</li>
                    <li>Settings</li>
                </ul>
            </content>

        )
    } 
}