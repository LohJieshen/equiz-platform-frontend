import Title from '../../../components/Title/Title.js';
import PageButtonContainer from '../../../components/PageButtonContainer/PageButtonContainer.js';
import {getAssignedQuiz} from '../../../api/QuizAPI.js';
import Button from '@mui/material/Button';
import DataTable from '../../../components/UI/DataDisplay/DataTable.js';
import {useEffect, useState, useCallback} from 'react';
import {Link} from 'react-router-dom';

const PastQuizResults = () => {

    const title = "Past Quiz Results";

    const [data, setData] = useState([]);

    const columns = [
        {field: "quizId", headerName: "ID", width: 64, maxWidth: 64},
        {field: "courseName", headerName: "Course Name", width: 256},
        {field: "quizName", headerName: "Quiz Name", width: 256},
        {field: "attempts", headerName: "Attempts"},
        {field: "maxAttempts", headerName: "Max Attempts"},
        {field: "dueDate", headerName: "Due Date", width: 256},
        {field: "highScore", headerName: "High Score", width: 128},
    ]

    const fetchData = useCallback(async() => {

        try {
            const quizData = await getAssignedQuiz(localStorage.getItem('userId'));
            setData(quizData);
            console.log("successfully receive past quiz resultsz.");
            console.log(quizData);
        }
        catch (error) {
            console.error("Error fetching past quiz results: ", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className='past_quiz_results'>
            <Title title={title}></Title>
            <PageButtonContainer>
                <Button component={Link} to="/" variant="contained" size="large">BACK TO MAIN</Button>
            </PageButtonContainer>
            <DataTable 
                columns = {columns}
                rows = {data}
                rowKey = "quizId"
            />
        </div>);
}

export default PastQuizResults;