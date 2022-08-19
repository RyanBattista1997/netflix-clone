import '../styles/css/Footer.css'
import FooterLi from './FooterLi'

export default function Footer(props) {

    return (
        <footer>
            <ul className='footer-ul'>
                <FooterLi text='home' icon='home' />
                <FooterLi text='search' icon='search' />
                <FooterLi text='download' icon='file' />
                <FooterLi text='menu' icon='menu' />
            </ul>
        </footer>
    )
}