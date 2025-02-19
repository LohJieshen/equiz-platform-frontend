import DataTable from '../../../components/UI/DataDisplay/DataTable.js';
import Title from '../../../components/Title/Title.js';
import {useEffect, useState, useCallback} from 'react';
import PageButtonContainer from '../../../components/PageButtonContainer/PageButtonContainer.js';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {getQuizStatus} from '../../../api/QuizAPI.js';

const QuizStatus = () => {
    const title = "Quiz Status";

    const [data, setData] = useState([]);

    const columns = [
        {field: "id", headerName: "User ID / Quiz ID", width: 192, maxWidth: 256},
        {field: "name", headerName: "Name", width: 256},
        {field: "quizName", headerName: "Quiz Name", width: 256},
        {field: "attempts", headerName: "Attempts", width: 128},
        {field: "highScore", headerName: "High Score", width: 128},
    ]

    const fetchData = useCallback(async() => {
        try {
            const quizStatus = await getQuizStatus(localStorage.getItem('userId'));
            setData(quizStatus);
            console.log("successfully receive assigned quiz.");
            console.log(quizStatus);
        }
        catch (error) {
            console.error("Error fetching assigned quiz: ", error);
        }
    }, []);

    // fetches data when the component mounts
    useEffect(() => {
        fetchData();
    }, [fetchData])

    return (
        <div className='assigned_quiz'>
            <Title title={title}></Title>
            <PageButtonContainer>
                <Button component={Link} to="/" variant="contained" size="large">BACK TO MAIN</Button>
            </PageButtonContainer>
            <DataTable columns={columns}
                        rows={data}
                        rowKey="id"
            ></DataTable>
        </div>
    );
}

export default QuizStatus;