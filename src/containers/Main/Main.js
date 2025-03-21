import React, {useState, useCallback, useEffect} from 'react';
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
import {hasLecturerAccess} from '../../api/UserAPI.js'

const Main = (props) => {

    const [isLecturer, setIsLecturer] = useState(null); // State to manage lecturer access

    const clickHandler = (event) => {
        event.preventDefault();
        setIsLecturer(null);
        return props.onLogout();
    }

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
                        <Route path="/" element = {<MainMenu isLecturer={isLecturer}/>} />
                        <Route path="/assigned-quiz" element = {<AssignedQuiz/>} />
                        <Route path="/past-quiz-results" element = {<PastQuizResults/>} />     
                        <Route path="/current-quiz" element = {<CurrentQuiz/>} />    
                        <Route path="/current-quiz-result" element = {<CurrentQuizResult/>} />  
                        {/* The Routes below are privileged to lecturers only */}
                        <Route path="/questions" element = {  isLecturer? <QuestionBank/> : <Navigate to="/" replace />} />
                        <Route path="/quiz" element = { isLecturer? <QuizBank/> : <Navigate to="/" replace />} />
                        <Route path="/quiz-status" element = { isLecturer? <QuizStatus/>  : <Navigate to="/" replace />} />
                        <Route path="/create-quiz" element = { isLecturer? <QuizCreation/> : <Navigate to="/" replace />} />
                        <Route path="/add-question" element = { isLecturer? <QuestionForm pageMode='add' />  : <Navigate to="/" replace />} />
                        <Route path="/view-edit-question/:questionId" element = { isLecturer? <QuestionForm pageMode='viewEdit'/>  : <Navigate to="/" replace />} />
                    </Routes>
                </QuizProvider>
        </div>
        
    </div>);
}

export default Main;