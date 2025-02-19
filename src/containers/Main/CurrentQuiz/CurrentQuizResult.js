import Title from '../../../components/Title/Title.js';
import {useEffect, useState, useCallback} from 'react';
import { useLocation } from 'react-router-dom';
import PageButtonContainer from '../../../components/PageButtonContainer/PageButtonContainer.js';
import '../../../components/UI/Card/Card.js'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom';

const CurrentQuizResult = () => {
    const [title, setTitle] = useState("Quiz Result");
    const location = useLocation();
    const { resultData } = location.state || {}; // Access the passed data
    const [questions, setQuestions] = useState([])
    const [score, setScore] = useState(resultData.score);
    const [totalQuestions, setTotalQuestions] = useState(resultData.totalQuestions);

    const questionHandler = () => {
        const newQuestions = resultData.selectedChoices.map((item) => {
            return (
                    <p>Question: {item? "Correct" : "Wrong"}</p>
            )
        });

        setQuestions(newQuestions);
    }

    return (
        <div className="curr_quiz_result">
            <Title title={title}/>
            <PageButtonContainer>
                <Button component={Link} to="/" variant="contained" size="large">BACK TO MAIN</Button>
            </PageButtonContainer>
            <Stack direction='row'>
                {/* This stack contains the individual question result */}
                <Stack direction='column'>
                    {questions}
                </Stack>
                {/* This stack contains the summary */}
                <Stack direction='column'>
                    <p>Score: {score} / {totalQuestions}</p>
                </Stack>
            </Stack>
        </div>
    );
}

export default CurrentQuizResult