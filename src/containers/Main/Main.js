import React, {useState} from 'react';
import {Provider} from 'react-redux';
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import MainMenu from './MainMenu/MainMenu.js';
import AssignedQuiz from './AssignedQuiz/AssignedQuiz.js';
import CurrentQuiz from './CurrentQuiz/CurrentQuiz.js';
import CurrentQuizResult from './CurrentQuiz/CurrentQuizResult.js';
import QuestionBank from './QuestionBank/QuestionBank.js';
import QuestionForm from './QuestionForm/QuestionForm.js';
import QuizCreation from './QuizCreation/QuizCreation.js';
import QuizBank from './QuizBank/QuizBank.js';
import QuizStatus from './QuizStatus/QuizStatus.js';
import PastQuizResults from './PastQuizResults/PastQuizResults.js';
import MainHeader from '../../components/MainHeader/MainHeader.js'
import './Main.css';
import Button from '@mui/material/Button';
import { QuizProvider } from './CurrentQuiz/CurrentQuizContext.js';

const Main = (props) => {

    const clickHandler = (event) => {
        event.preventDefault();
        return props.onLogout();
    }

    return (
        <div className='main_whole'>
            <header>
                <MainHeader/>
                <Button onClick={clickHandler}>Logout</Button>
            </header>
            <div className='main_page'> 
                <QuizProvider>
                    {/* MAIN SECTION SWITCHING */}
                    <Routes>
                        <Route path="/" element = {<MainMenu/>} />
                        <Route path="/assigned-quiz" element = {<AssignedQuiz/>} />
                        <Route path="/past-quiz-results" element = {<PastQuizResults/>} />     
                        <Route path="/current-quiz" element = {<CurrentQuiz/>} />      
                        <Route path="/questions" element = {<QuestionBank/>} />
                        <Route path="/quiz" element = {<QuizBank/>} />
                        <Route path="/quiz-status" element = {<QuizStatus/>} />
                        <Route path="/create-quiz" element = {<QuizCreation/>} />
                        <Route path="/add-question" element = {<QuestionForm pageMode='add' />} />
                        <Route path="/view-edit-question/:questionId" element = {<QuestionForm pageMode='viewEdit'/>} />
                        <Route path="/current-quiz-result" element = {<CurrentQuizResult/>} />
                    </Routes>
                </QuizProvider>
        </div>
        
    </div>);
}

export default Main;