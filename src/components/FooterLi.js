import home from '../images/home.svg';
import menu from '../images/menu.svg';
import file from '../images/file.svg';
import search from '../images/search.svg';
import '../styles/css/FooterLi.css'
import { useSelector } from 'react-redux/es/exports';

export default function FooterLi(props) {
    const { text , icon } = props;
    const { activeFooterLi } = useSelector(store => store.header)

    const iconKeys = {
        'home': home,
        'file': file,
        'menu': menu,
        'search': search
    }

    return (
        <li className='footer-li'>
            <content className='footer-li-content' 
                    data-active={icon === activeFooterLi? true: false}
                    data-type={text} 
            >
                <img src={iconKeys[icon]} className='menu-icon'/>
                {text}
            </content>
        </li>
    )
}