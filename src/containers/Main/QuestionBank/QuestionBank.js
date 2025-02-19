import DataTable from '../../../components/UI/DataDisplay/DataTable.js';
import './QuestionBank.css';
import Title from '../../../components/Title/Title.js'
import {getQuestionBank} from '../../../api/QuestionAPI.js'
import PageButtonContainer from '../../../components/PageButtonContainer/PageButtonContainer.js';
import Button from '@mui/material/Button';
import {useEffect, useState, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const QuestionBank = () => {

    const title = "Question Bank";

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const columns = [
        {field: "questionId", headerName: "ID", maxWidth: 64},
        {field: "courseName", headerName: "Course Name", width: 128},
        {field: "topicName", headerName: "Topic Name", width: 128},
        {field: "questionBody", headerName: "Question Text Preview", width: 640},
        {field: "viewEdit", headerName: "View/Edit", width: 128} 
    ];
  
    const fetchData = useCallback(async() => {

        try {
            const questionData = await getQuestionBank();
            setData(questionData);
            console.log("successfully receive question bank.");
            console.log(questionData);
        }
        catch (error) {
            console.error("Error fetching question bank: ", error);
        }
    }, []);

    // fetches data when the component mounts
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    // Render the "VIEW / EDIT" Column to have a link to the individual question in the question bank
    const renderCell = (params) => {
        if (params.field === 'viewEdit') {
            return (
                <Button
                    onClick={() => navigate(`/view-edit-question/${params.row.questionId}`)}
                    variant='contained'
                >
                    View/Edit
                </Button>
            );
        }
        return params.value;
      }

    return (
        <div className='question_bank'>
            <Title title={title}/>
            <PageButtonContainer>
                <Button component={Link} to="/" variant="contained" size="large">BACK TO MAIN</Button>
                <Button component={Link} to="/add-question" variant="contained" size="large">ADD NEW QUESTION</Button>
            </PageButtonContainer>
            <DataTable columns={columns}
                        rows={data}
                        rowKey="questionId"
                        renderCell={renderCell}
            ></DataTable>
        </div>
    );
}

export default QuestionBank