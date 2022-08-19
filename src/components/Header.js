import '../styles/css/Header.css'
import LinkList from './LinkList'
import HeaderSearchBar from './HeaderSearchBar'
import UserDDMenu from './UserDDMenu'
import Default_User_Img from '../images/Default_Avatar.png'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDD, setPage } from '../features/headerSlice'

export default function Header(props) {

  const {headerDd, matchesMob, matchesTab} = useSelector(store => store.header)
  const dispatch = useDispatch();

  //handles all header click events besides search bar
  function headerClickHandler(e) {
    const { className, dataset, textContent} = e.target;
    if(className === 'header-li') {
      if(dataset.active === 'true') {
        return
      }
      dataset.active = true;
      const nextPage = textContent.toLowerCase();
      dispatch(setPage(nextPage))
    }
  }

  return (
      <header className="header-main" onClick={headerClickHandler} >
        <svg className='netflix-logo'>
            <g id="netflix-logo">
                <path d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z">
                </path>
            </g>
        </svg>
        { !matchesTab && <ul className='link-list' >
            <li >Home</li>
            <LinkList text = 'Series'/>
            <LinkList text = 'Movies'/>
            <LinkList text = 'Originals'/>
            <li>Recently Added</li>
            <li>My List</li>
        </ul>}
          {!matchesMob &&<div className='user-container'>
            <ul className='right-list'>
              <li> 
                {!matchesTab && <HeaderSearchBar />}
              </li>
              <li>KIDS</li>
              <li>DVD</li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" className='noti-icon'>
                  <path d="M8 38v-3h4.2V19.7q0-4.2 2.475-7.475Q17.15 8.95 21.2 8.1V6.65q0-1.15.825-1.9T24 4q1.15 0 1.975.75.825.75.825 1.9V8.1q4.05.85 6.55 4.125t2.5 7.475V35H40v3Zm16-14.75ZM24 44q-1.6 0-2.8-1.175Q20 41.65 20 40h8q0 1.65-1.175 2.825Q25.65 44 24 44Zm-8.8-9h17.65V19.7q0-3.7-2.55-6.3-2.55-2.6-6.25-2.6t-6.275 2.6Q15.2 16 15.2 19.7Z"/>
                </svg>
              </li>
              <li className='user-icon'>
                  <img src={Default_User_Img} alt='user-icon' onClick = {() => dispatch(toggleDD())} name ='user-icon'/>
                  {headerDd && <div className='dd_arrow'></div>} {/*cosmetic arrow*/}
                  {headerDd && <UserDDMenu userName={props.userName}/>}
              </li>
            </ul>
          </div>}  
      </header>
  )  
}