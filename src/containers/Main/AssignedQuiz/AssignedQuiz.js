import DataTable from '../../../components/UI/DataDisplay/DataTable.js';
import {getAssignedQuiz} from '../../../api/QuizAPI.js';
import Title from '../../../components/Title/Title.js';
import {QuizContext} from '../CurrentQuiz/CurrentQuizContext.js';
import {useEffect, useState, useCallback, useContext} from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageButtonContainer from '../../../components/PageButtonContainer/PageButtonContainer.js';
import {Link} from 'react-router-dom';

const AssignedQuiz = () => {

    const title = "My Quiz";

    const columns = [
        {field: "quizId", headerName: "ID", width: 64, maxWidth: 64},
        {field: "courseName", headerName: "Course Name", width: 192},
        {field: "quizName", headerName: "Quiz Name", width: 256},
        {field: "attempts", headerName: "Attempts"},
        {field: "maxAttempts", headerName: "Max Attempts"},
        {field: "dueDate", headerName: "Due Date", width: 128},
        {field: "highScore", headerName: "High Score", width: 128, maxWidth: 128},
        {field: "status", headerName: "Status", width: 128},
        {field: "action", headerName: "Action", width: 256} 
    ];

    const { setQuizId } = useContext(QuizContext);

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const clickHandler = (quizId, action) => (event) => {
        event.preventDefault();
        if (action !== "NO ACTION POSSIBLE") {
            
            setQuizId(quizId);
            navigate(`/current-quiz`);
        }
    }

    const fetchData = useCallback(async() => {

        try {
            const quizData = await getAssignedQuiz(localStorage.getItem('userId'));
            setData(quizData);
            console.log("successfully receive assigned quiz.");
            console.log(quizData);
        }
        catch (error) {
            console.error("Error fetching assigned quiz: ", error);
        }
    }, []);

    // fetches data when the component mounts
    useEffect(() => {
        fetchData();
    }, [fetchData])

    // Render the "ACTION" Column to have a link to the individual question in the question bank
    const renderCell = (params) => {
        if (params.field === 'action') {
            return (
                <Button
                    onClick={clickHandler(params.row.quizId, params.row.action)}
                    variant='contained'
                >
                    {params.row.action}
                </Button>
            );
        }
        return params.value;
      }


    return (
        <div className='assigned_quiz'>
            <Title title={title}></Title>
            <PageButtonContainer>
                <Button component={Link} to="/" variant="contained" size="large">BACK TO MAIN</Button>
            </PageButtonContainer>
            <DataTable columns={columns}
                        rows={data}
                        rowKey="quizId"
                        renderCell={renderCell}
            ></DataTable>
        </div>
    );
}

export default AssignedQuiz;