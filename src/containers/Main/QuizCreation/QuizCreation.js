import './QuizCreation.css';
import Title from '../../../components/Title/Title.js';
import Card from '../../../components/UI/Card/Card.js';
import {addQuiz} from '../../../api/QuizAPI.js';
import DataTable from '../../../components/UI/DataDisplay/DataTable.js';
import Button from '@mui/material/Button';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const QuizCreation = () => {
    const title = "Create Quiz";

    const [quizName, setChangedTitle] = useState('');
    const [maxAttempts, setMaxAttempts] = useState('1');
    const [dueDate, setDueDate] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const columns = [
        {field: "question_id", headerName: "ID", width: 64},
        {field: "topic_name", headerName: "Topic Name", width: 128},
        {field: "question_body", headerName: "Question Text Preview", width: 512},
        {field: "correct_answer", headerName: "Correct Answer", width: 256}        
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