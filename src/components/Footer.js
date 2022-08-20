import '../styles/css/Footer.css'
import FooterLi from './FooterLi'
import { useSelector, useDispatch } from 'react-redux';
import { setMobMenuActive, setMobMenuContent } from '../features/headerSlice';
import MobileMenu from './MobileMenu';

export default function Footer() {

    const { mobMenuActive, mobMenuContent} = useSelector(store => store.header);
    const dispatch = useDispatch();

    function footerClickHandler(e) {


        if(e.target.dataset.type === 'search') {
            dispatch(setMobMenuActive())
            dispatch(setMobMenuContent('search'))
        }
    }

    return (
        <footer onClick={footerClickHandler}>
            {mobMenuActive && <MobileMenu content={mobMenuContent} />}
            <ul className='footer-ul'>
                <FooterLi text='home' icon='home' />
                <FooterLi text='search' icon='search' />
                <FooterLi text='download' icon='file' />
                <FooterLi text='menu' icon='menu' />
            </ul>
        </footer>
    )
}