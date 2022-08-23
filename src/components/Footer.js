import '../styles/css/Footer.css'
import FooterLi from './FooterLi'
import swapAcc from '../images/swapAcc.svg';
import searchIcon from '../images/search.svg';
import notiIcon from '../images/noti.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setMobMenuActive, setMobMenuContent, clearSearch, toggleResults, setActiveFooterLi } from '../features/headerSlice';
import MobileMenu from './MobileMenu';

export default function Footer() {

    const icons = {
        searchIcon: searchIcon,
        notiIcon: notiIcon,
        swapAcc: swapAcc
    }

    const { mobMenuActive, mobMenuContent, activeFooterLi} = useSelector(store => store.header);
    const dispatch = useDispatch();

    function footerClickHandler(e) {

        const {dataset} = e.target;

        if(dataset.type === 'download') {
            return
        }
        if(dataset.type === 'home' && activeFooterLi === 'home') {
            return
        }
        if(dataset.type === 'home' && activeFooterLi !== 'home') {
            if(activeFooterLi === 'search') {
                dispatch(clearSearch())
                dispatch(toggleResults())
            }
            dispatch(setActiveFooterLi('home'))
            dispatch(setMobMenuActive());
            return
        }

        if(dataset.active === 'true'){
            if(dataset.type === 'search') {
                dispatch(clearSearch())
                dispatch(toggleResults())
            }
            dispatch(setActiveFooterLi('home'))
            dispatch(setMobMenuActive());
            return
        }
        if(activeFooterLi === 'home'){
            dispatch(setMobMenuActive());
        }
        dispatch(setActiveFooterLi(dataset.type))
        dispatch(setMobMenuContent(dataset.type));

    }

    return (
        <footer>
            {mobMenuActive && <MobileMenu content={mobMenuContent} icons={ icons }/>}
            <ul className='footer-ul' onClick={footerClickHandler}>
                <FooterLi text='home' icon='home' />
                <FooterLi text='search' icon='search' />
                <FooterLi text='download' icon='file' />
                <FooterLi text='menu' icon='menu' />
            </ul>
        </footer>
    )
}