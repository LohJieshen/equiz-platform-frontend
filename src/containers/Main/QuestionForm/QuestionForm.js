import Title from '../../../components/Title/Title.js';
import {initState, reducer} from './QuestionFormReducer.js';
import {getQuestion} from '../../../api/QuestionAPI.js';
import { Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Stack, Select, MenuItem } from '@mui/material';
import React, {useState, useReducer, useEffect, useCallback} from 'react';
import {Link, useParams} from 'react-router-dom';
import PageButtonContainer from '../../../components/PageButtonContainer/PageButtonContainer.js';
import './QuestionForm.css'

/**
 * This component is used for the following purpose:
 * - Adding a new question
 * - View/Edit/Remove an existing question
 * (Self-note: seems like perfect scenario to use Reducer)
 * @returns Question Form component
 */
const QuestionForm = (props) => {

    const [state, dispatch] = useReducer(reducer, {...initState, mode: props.pageMode});

    const {questionId} = useParams();

    const fetchData = useCallback(async() => {

        try {
            const questionData = await getQuestion(questionId);
            dispatch({
                type: 'SET_DATA',
                payload: questionData
            });
            console.log("successfully receive question bank.");
            console.log(questionData);
        }
        catch (error) {
            console.error("Error fetching question bank: ", error);
        }
    }, [questionId]);

    // TODO - make this page have 1 of these 2 modes: Add Question, View/Edit Question
    useEffect(() => {
        if (state.mode === 'viewEdit') {
        fetchData(); // TODO - call method from QuestionAPI.js
        }
    }, [state.mode, fetchData]);

    const modeHandler = (mode) => {
        dispatch({
            type: 'SET_MODE',
            payload: mode
        });
    };

    const titleHandler = (title) => {
        dispatch({
            type: 'SET_TITLE',
            payload: title
        })
    }

    const questionHandler = (formData) => {
        dispatch({
            type: 'SET_DATA',
            payload: formData
        })
    }

    const [title, setTitle] = useState("Add Question");
    const [totalChoices, setTotalChoices] = useState();

    const confirmDiscardHandler = (event) => {
        event.preventDefault();
    }

    const confirmProceedHandler = (event) => {
        event.preventDefault();
    }

    const totalChoicesHandler = (event) => {
        setTotalChoices(event.target.value);
    }

    // TODO - Chain reaction to topic name on change
    const courseNameChangeHandler = (event) => {
        setChangedTitle(event.target.value);
    }

    const topicNameChangeHandler = (event) => {
        setChangedTitle(event.target.value);
    }

    return (
        <div className='question_form'>
            <Title title={title}></Title>
            <PageButtonContainer>
                <Button component={Link} to="/questions" variant="contained" size="large">BACK TO QUESTION BANK</Button>
            </PageButtonContainer>
                <FormControl fullWidth>
                    <Stack direction='row'>
                        <FormControl>
                            <Select labelId='topicName'>
                                {}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Select labelId='totalChoices' value={totalChoices} onChange={totalChoicesHandler}>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    
                    <TextField 
                        helperText="Type Question here" 
                        id="questionBody" 
                        label="Question" 
                        multiline rows={6} 
                        fullWidth 
                        value={state.formData.questionBody} 
                        onChange={(e) => 
                        dispatch({ type: 'SET_DATA', payload: { ...state.formData, questionBody: e.target.value } })}/>
                    <RadioGroup
                            aria-labelledby="choices-group"
                            defaultValue="choice1"
                            name="radio-buttons-group"
                     >
                        <Stack direction='row'>
                            <FormControlLabel value="choice1" 
                                            control={<Radio />} 
                                            label={<TextField 
                                                id="choice1_text" 
                                                helperText="Fill Choice 1 here" 
                                                fullWidth 
                                                value={state.formData.choice1}
                                                onChange={(e) => 
                                                dispatch({ type: 'SET_DATA', payload: { ...state.formData, choice1: e.target.value } })}/>} />
                            <FormControlLabel value="choice2" 
                                            control={<Radio />} 
                                            label={<TextField 
                                                id="choice2_text" 
                                                helperText="Fill Choice 2 here" 
                                                fullWidth 
                                                value={state.formData.choice2}
                                                onChange={(e) => 
                                                dispatch({ type: 'SET_DATA', payload: { ...state.formData, choice2: e.target.value } })}/>} />
                        </Stack>
                        <Stack direction='row'>
                            <FormControlLabel value="choice3" 
                                            control={<Radio />} 
                                            label={<TextField 
                                                id="choice3_text" 
                                                helperText="Fill Choice 3 here" 
                                                fullWidth 
                                                value={state.formData.choice3}
                                                onChange={(e) => 
                                                dispatch({ type: 'SET_DATA', payload: { ...state.formData, choice3: e.target.value } })}/>} />
                            <FormControlLabel value="choice4" 
                                            control={<Radio />} 
                                            label={<TextField 
                                                id="choice4_text" 
                                                helperText="Fill Choice 4 here" 
                                                fullWidth 
                                                value={state.formData.choice4}
                                                onChange={(e) => 
                                                dispatch({ type: 'SET_DATA', payload: { ...state.formData, choice4: e.target.value } })}/>} />
                        </Stack>
                    </RadioGroup>
                    <div className='add_question_options'>
                        {/* TODO - Either options are to darken the background and have an overlay asking to confirm */}
                        <Button onClick={confirmDiscardHandler} variant="contained" size="large">Discard</Button>
                        <Button onClick={confirmProceedHandler} variant="contained" size="large">Proceed</Button>
                    </div>
                </FormControl>
        </div>
    );    
}

export default QuestionForm;