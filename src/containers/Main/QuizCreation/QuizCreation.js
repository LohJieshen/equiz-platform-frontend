import './QuizCreation.css';
import Title from '../../../components/Title/Title.js';
import Card from '../../../components/UI/Card/Card.js';
import {addQuiz} from '../../../api/QuizAPI.js';
import {getQuestionBank} from '../../../api/QuestionAPI.js'
import DataTable from '../../../components/UI/DataDisplay/DataTable.js';
import Button from '@mui/material/Button';
import React, {useEffect, useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const QuizCreation = () => {
    const title = "Create Quiz";

    const [quizName, setChangedTitle] = useState('');
    const [maxAttempts, setMaxAttempts] = useState('1');
    const [dueDate, setDueDate] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
                                    
    const columns = [
        {field: "questionId", headerName: "ID", maxWidth: 64},
        {field: "courseName", headerName: "Course Name", width: 128},
        {field: "topicName", headerName: "Topic Name", width: 128},
        {field: "questionBody", headerName: "Question Text Preview", width: 640},
        {field: "viewEdit", headerName: "View/Edit", width: 128} 
    ];

    const confirmDiscardHandler = (event) => {
        event.preventDefault();
    }

    const confirmProceedHandler = (event) => {
        event.preventDefault();
    }

    const quizNameChangeHandler = (event) => {
        setChangedTitle(event.target.value);
    }

    const dueDateChangeHandler = (event) => {
        setDueDate(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
    }

    const fetchData = useCallback(async() => {

        try {
            // TODO - Filter by topic
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

    // TODO - If Course and Title not selected, blank the contents
    return (
        <div className='quiz_creation'>
            <Title title={title}></Title>
            <Card className='quiz_creation_body'>
                <form onSubmit={submitHandler}>
                    <div className='quiz_creation__controls'>
                        <div className='quiz_creation__controls_left'>
                            <div className='quiz_creation__control'>
                                <label>Quiz Name</label>
                                <input type='text' value={quizName} onChange={quizNameChangeHandler}/>
                            </div>
                        </div>
                        <div className='quiz_creation__controls_right'>
                            <div className='quiz_creation__control'>
                                <label>Max Attempts</label>
                                <input type='number' value={maxAttempts} min='1'/>
                            </div>
                            <div className='quiz_creation__control'>
                                <label>Due Date</label>
                                <input type='date' value={dueDate} onChange={dueDateChangeHandler}/>
                            </div>
                        </div>
                    </div>
                    <DataTable columns={columns}
                                rows={data}
                                rowKey="questionId"
                                renderCell={renderCell}
                    onSelectionModelChange={setSelectedQuestions}/>
                    <div className='quiz_creation_options'>
                        {/* TODO - "Discard" and "Create Quiz" options */}
                        {/* Either options are to darken the background and have an overlay asking to confirm */}
                        <Button component={Link} to="/" variant="contained" size="large">Discard</Button>
                        <Button onClick={confirmProceedHandler} variant="contained" size="large">Proceed</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default QuizCreation;