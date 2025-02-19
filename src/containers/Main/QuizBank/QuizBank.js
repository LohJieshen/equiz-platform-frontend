import DataTable from '../../../components/UI/DataDisplay/DataTable.js';
import {getQuizBank} from '../../../api/QuizAPI.js'
import {hasLecturerAccess} from '../../../api/UserAPI.js'
import {useEffect, useState, useCallback} from 'react';
import Title from '../../../components/Title/Title.js'
import PageButtonContainer from '../../../components/PageButtonContainer/PageButtonContainer.js';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

const QuizBank = () => {

    const title = "Quiz Bank";

    const [data, setData] = useState([]);
    const [isLecturer, setIsLecturer] = useState(null); // State to manage lecturer access

    const columns = [
        {field: "quizId", headerName: "ID", width: 128},
        {field: "quizName", headerName: "Quiz Name", width: 256},
        {field: "courseName", headerName: "Course Name", width: 256},
    ];

    const fetchData = useCallback(async() => {

        try {
            const quizResult = await getQuizBank(localStorage.getItem('courseId'));
            setData(quizResult);
            console.log("successfully receive quiz bank.");
            console.log(quizResult);
        }
        catch (error) {
            console.error("Error fetching quiz bank: ", error);
        }
    }, []);

    // fetches data when the component mounts
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const checkLecturerAccess = useCallback(async () => {
        try {
            const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
            const access = await hasLecturerAccess(userId);
            setIsLecturer(access);
        } catch (error) {
            console.error("Error checking lecturer access: ", error);
        }
    }, []);

    useEffect(() => {
        checkLecturerAccess();
    }, [checkLecturerAccess]);

    useEffect(() => {
        if (isLecturer) {
            fetchData();
        }
    }, [isLecturer, fetchData]);

    if (isLecturer === null) {
        return <div>Loading...</div>; // Show a loading state while checking access
    }

    return (
        <div className='quiz_bank'>
            <Title title={title} />
            <PageButtonContainer>
                <Button component={Link} to="/" variant="contained" size="large">BACK TO MAIN</Button>
            </PageButtonContainer>
            {isLecturer ? (
            <DataTable columns={columns}
                        rows={data}
                        rowKey="quizId"
            ></DataTable>) : (
                <p>You are not authorised to access this function.</p>
            )}
        </div>
    );
}

export default QuizBank;