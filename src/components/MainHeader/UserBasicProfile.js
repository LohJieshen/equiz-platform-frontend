import {getUserBasicInfo} from '../../api/UserAPI.js';
import {useState, useEffect} from 'react';

const UserBasicProfile = () => {

    const [userBasicProfile, setUserBasicProfile] = useState({});
    const userId = localStorage.getItem('userId');

    const userBasicInfoHandler = async () => {
        const userInfo = await getUserBasicInfo(userId);
        setUserBasicProfile(userInfo);
        console.log(userInfo);
    }

    useEffect( () => {
        userBasicInfoHandler(userId);
    },[]);

    return (
        <div className='user_basic_profile'>
            Welcome, {userBasicProfile.firstName}<br/>
            Last Login Date: {userBasicProfile.lastLoginDate}<br/>
            Role: {userBasicProfile.role}
        </div>
    )
}

export default UserBasicProfile;