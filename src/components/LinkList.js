import { useSelector } from "react-redux";
import '../styles/css/LinkList.css'

export default function LinkList(props) {

    const { text } = props;
    const { page } = useSelector(store => store.header);

    return (
        <li data-active={page === text.toLowerCase() ? true : false} className='header-li'>{text}</li>
    )
}