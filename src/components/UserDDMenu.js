import '../styles/css/UserDDMenu.css'
import Default_User_Img from '../images/Default_Avatar.png'

export default function UserDDMenu(props) {
    const {userName} = props;
    return (

        <div className="user_dd_cont">
            <div className="dd_profile">
                <div className='user_div'>
                    <img src={Default_User_Img} alt='user-icon'/>
                    <span>{userName}</span> 
                </div>
                <span>Manage Profiles</span>
            </div>
            <div className="dd_account">
                <span>Account</span>
                <span>Help Center</span>
                <span>Sign Out</span>
            </div>
        </div>
    )
}