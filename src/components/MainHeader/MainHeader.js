import './MainHeader.css';
import UserBasicProfile from './UserBasicProfile';

const MainHeader = () => {

    return (
        <div className = 'main_header'>
            <div className = 'title'><h1>&#181;Learn</h1></div>
            <div className = 'spacer'/>
            <div className = 'basic_profile'><UserBasicProfile/></div>
        </div>
    )
}

export default MainHeader;