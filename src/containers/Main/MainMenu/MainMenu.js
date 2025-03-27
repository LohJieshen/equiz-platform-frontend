import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './MainMenu.css'

const MainMenu = (props) => {

    if (props.isLecturer === null) {
        return <div><CircularProgress /><br/>Loading<br/></div>; // Show a loading state while checking access
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

            { props.isLecturer ? (<React.Fragment>
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