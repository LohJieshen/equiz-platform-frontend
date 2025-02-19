import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = (props) => {
    const [quizId, setQuizId] = useState(null);

    return (
        <QuizContext.Provider value={{ quizId, setQuizId }}>
            {props.children}
        </QuizContext.Provider>
    );
};