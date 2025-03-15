import Title from '../../../components/Title/Title.js';
import {useContext, useEffect, useState, useCallback} from 'react';
import PageButtonContainer from '../../../components/PageButtonContainer/PageButtonContainer.js';
import {Link} from 'react-router-dom';
import {getQuestion, getNextQuestion, getPrevQuestion, updateCurrQuestionSelectedChoice } from '../../../api/QuestionAPI.js';
import {launchQuiz, endQuiz} from '../../../api/QuizAPI.js';
import { Button, FormControl, RadioGroup, FormControlLabel, Radio, Stack} from '@mui/material';
import { QuizContext } from './CurrentQuizContext.js';
import { useNavigate } from 'react-router-dom';


const CurrentQuiz = () => {

    const { quizId } = useContext(QuizContext);
    const [currQuestionNo, setCurrQuestionNo] = useState(1);
    const [isFirstQuestion, setIsFirstQuestion] = useState(true);
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [question, setQuestion] = useState(null);
    const [title, setTitle] = useState("Loading...");
    const [selectedChoices, setSelectedChoices] = useState({}); // State variable to store selected choices
    const [quizData, setQuizData] = useState(null);
    const navigate = useNavigate();

    const choiceSelectionHandler = async (event) => {
        const value = event.target.value;
        let choiceNumber;
        switch (value) {
            case "choice1":
                choiceNumber = 1;
                break;
            case "choice2":
                choiceNumber = 2;
                break;
            case "choice3":
                choiceNumber = 3;
                break;
            case "choice4":
                choiceNumber = 4;
                break;
            default:
                choiceNumber = 1;
        }

        // Update local state
        setSelectedChoices(prevChoices => ({
            ...prevChoices,
            [currQuestionNo]: choiceNumber
        }));

        // Update quizData.selectedChoices array
        setQuizData(prevQuizData => {
            const updatedSelectedChoices = [...prevQuizData.selectedChoices];
            updatedSelectedChoices[currQuestionNo - 1] = choiceNumber;
            return {
                ...prevQuizData,
                selectedChoices: updatedSelectedChoices
            };
        });

        await updateCurrQuestionSelectedChoice(localStorage.getItem('userId'), quizId, currQuestionNo, choiceNumber); // updates backend temp files
        console.log("Set Selected Choice: " + choiceNumber);
    }

    const prevQuestionHandler = async (event) => {
        event.preventDefault();

        if (currQuestionNo > 1) {
            const newQuestionNo = currQuestionNo - 1;
            setCurrQuestionNo(newQuestionNo);
            setIsFirstQuestion(newQuestionNo === 1);
            setIsLastQuestion(false);
            //await getPrevQuestion(localStorage.getItem('userId'), quizId, currQuestionNo); // Fire off GET request - commented out because of alt implementation
            fetchCurrQuestion(quizData.questionOrder[newQuestionNo - 1]);
        }
    }

    const nextQuestionHandler = async (event) => {
        event.preventDefault();

        if (currQuestionNo < totalQuestions) {
            const newQuestionNo = currQuestionNo + 1;
            setCurrQuestionNo(newQuestionNo);
            setIsFirstQuestion(false);
            setIsLastQuestion(newQuestionNo === totalQuestions);
            //await getNextQuestion(localStorage.getItem('userId'), quizId, currQuestionNo); // Fire off GET request - commented out because of alt implementation
            fetchCurrQuestion(quizData.questionOrder[newQuestionNo - 1]);
        }
    }

    const endQuizHandler = async (event) => {
        event.preventDefault();

        try {
            const resultData = await endQuiz(quizData); // Fire off PUT request
            navigate('/current-quiz-result', { state: { resultData } }); // Redirect to QuizResult component
        } catch (error) {
            console.error("Error ending quiz: ", error);
        }
    }

    // TODO - Modify to do a few things
    // 1. Fetch the current quiz info you have pressed on
    // 2. Fetch the last question done (if resume) / first question (if start)
    const fetchCurrQuestion = useCallback(async(currQuestionNo) => {

        try {
            const questionData = await getQuestion(currQuestionNo); 
            setQuestion(questionData);
            console.log("successfully receive current question.");
            console.log(questionData);
        }
        catch (error) {
            console.error("Error fetching question bank: ", error);
        }
    }, []);

    const fetchQuizData = useCallback(async() => {
        try {
            const quizData = await launchQuiz(quizId);
            setQuizData(quizData);
            setCurrQuestionNo(quizData.currQuestion); // need to align with currQuestionNo field from backend
            setTotalQuestions(quizData.totalQuestions);
            console.log(quizData.totalQuestions);
            setTitle(quizData.courseName + " / " + quizData.quizName);
            console.log(title);
            console.log("Successfully received quiz data.");
            console.log(quizData);

            // Initialize selectedChoices with default values
            const initialSelectedChoices = {};
            quizData.questionOrder.forEach((_, index) => {
                initialSelectedChoices[index + 1] = quizData.selectedChoices[index] || 1;
            });
            setSelectedChoices(initialSelectedChoices);

            // Fetch the current question after getting quiz data
            fetchCurrQuestion(quizData.questionOrder[currQuestionNo - 1]);
            setIsFirstQuestion(quizData.currQuestion === 1);
            setIsLastQuestion(quizData.currQuestion === quizData.totalQuestions);
        } catch (error) {
            console.error("Error fetching quiz data: ", error);
        }
    }, [quizId, fetchCurrQuestion]);

    useEffect(() => {
        fetchQuizData()
    }, [fetchQuizData]);

    useEffect(() => {
        console.log("Title updated:", title);
    }, [title]);

    useEffect(() => {
        console.log("Updated selected choice:", selectedChoices);
    }, [selectedChoices]);

    // "Previous" button to disappear if question is the first
    // "Next" button to change to "End Quiz" button if it's last question
    return (
        <div className='question'>
            {/* This section contains the Question Body and available choices*/}
            {question ? (
                <>
            <Title title={title}/>

            <PageButtonContainer>
                <Button component={Link} to="/" variant="contained" size="large">BACK TO MAIN</Button>
            </PageButtonContainer>

            {/* This section contains the Question Body and available choices*/}

            <FormControl>
                {currQuestionNo + ". "}{question.questionBody}
                <RadioGroup
                            aria-labelledby="choices-group"
                            value={`choice${selectedChoices[currQuestionNo] || 1}`}
                            name="radio-buttons-group"
                     >
                    <Stack direction='row'>
                            <FormControlLabel value="choice1" 
                                            control={<Radio />} 
                                            label={question.choice1}
                                            onChange={choiceSelectionHandler}
                            />
                            <FormControlLabel value="choice2" 
                                            control={<Radio />} 
                                            label={question.choice2} 
                                            onChange={choiceSelectionHandler}
                             />
                        </Stack>
                        <Stack direction='row'>
                            {question.choice3 ? <FormControlLabel value="choice3" 
                                            control={<Radio />} 
                                            label={question.choice3}
                                            onChange={choiceSelectionHandler}
                            /> : <p/>}
                            {question.choice4 ? <FormControlLabel value="choice4" 
                                            control={<Radio />} 
                                            label={question.choice4}
                                            onChange={choiceSelectionHandler}
                            /> : <p/>}
                        </Stack>
                </RadioGroup>
            </FormControl>

            <PageButtonContainer>
                {isFirstQuestion? <div/> : <Button onClick={prevQuestionHandler} variant="contained">Prev</Button>}
                {isLastQuestion?    <Button onClick={endQuizHandler} variant="contained">End Quiz</Button> : 
                                    <Button onClick={nextQuestionHandler} variant="contained">Next</Button>}
            </PageButtonContainer>  
            </>) : (            
                    <p>Loading Question...</p>
                )}
                    
        </div>
    )
}

export default CurrentQuiz;