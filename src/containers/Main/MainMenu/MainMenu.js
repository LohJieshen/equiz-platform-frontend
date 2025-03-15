import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom';
import React, {useEffect, useState, useCallback} from 'react';
import {hasLecturerAccess} from '../../../api/UserAPI.js'
import './MainMenu.css'

const MainMenu = () => {

    const [isLecturer, setIsLecturer] = useState(null); // State to manage lecturer access

    const checkLecturerAccess = useCallback(async () => {
        try {
            const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
            const access = await hasLecturerAccess(userId);
            setIsLecturer(access);
            console.log("lecturer access: " + access);
        } catch (error) {
            console.error("Error checking lecturer access: ", error);
        }
    }, []);

    useEffect(() => {
        checkLecturerAccess();
    }, [checkLecturerAccess]);

    if (isLecturer === null) {
        return <div>Loading...</div>; // Show a loading state while checking access
    }

    return (
        <Stack direction='row' spacing='5%'>
            <Button component={Link} to="/assigned-quiz" variant="contained" size="large">
                My Assigned Quiz
            </Button>
            <Button component={Link} to="/past-quiz-results" variant="contained" size="large">
                View Past Results
            </Button>

            {/* Lecturer-Access functions */}

            { isLecturer ? (<React.Fragment>
            <Button component={Link} to="/create-quiz" variant="contained" size="large">
                Create Quiz
            </Button>
            <Button component={Link} to="/questions" variant="contained" size="large">
                View Question Bank
            </Button>
            <Button component={Link} to="/quiz" variant="contained" size="large">
                View Quiz Bank
            </Button>
            <Button component={Link} to="/quiz-status" variant="contained" size="large">
                View Quiz Status
            </Button>
            </React.Fragment>) : (<p/>)
            }
        </Stack>
    )
}

export default MainMenu;