
/**
 * Contains methods for returning outputs or posting inputs related directly to quiz
 */

const mainAddress = process.env.REACT_APP_SERVICE_BASE_API_URL + "/quiz";

    
/**
 * Gets a list of assigned quiz, based on the user's course.
 */
export const getAssignedQuiz = async () => {
    let endpoint = mainAddress + "/assigned/" + localStorage.getItem('userId');

    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error('Something crashed: ' + response.statusText);
    }

    const rawData = await response.json();
    console.log(rawData);

    // Transform response object into data field 
    // for component's prop field
    const transformedQuizList = rawData.content.map((quizData) => {
        return {    
            quizId: quizData.quizId,
            courseName: quizData.courseName,
            quizName: quizData.quizName, 
            attempts: quizData.attempts,
            maxAttempts: quizData.maxAttempts,
            dueDate: quizData.dueDate,
            highScore: quizData.highScore,
            totalQuestions: quizData.totalQuestions,
            status: quizData.status,
            action: quizData.action
        };
    });

    return transformedQuizList;
}

/**
 * Gets a single quiz based on its id, for usage by lecturer to edit a single quiz (are you sure?)
 * @param {*} id 
 */
export const getQuiz = async (id) => {
    let endpoint = mainAddress + '/' + id;

    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error('Something crashed: ' + response.statusText);
    }

    const rawData = await response.json();
    console.log(rawData);

    const transformedQuiz = rawData.map((quizData) => {
        return {
            quizId: quizData.quizId,
            quizName: quizData.quizName,
            courseName: quizData.courseName,
            questions: [... quizData.questions], 
        };
    });

    return transformedQuiz;
}

export const launchQuiz = async (quizId) => {
    let endpoint = mainAddress + '/start/' + quizId + '?userId=' + localStorage.getItem('userId');

    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error('Something crashed: ' + response.statusText);
    }

    const rawData = await response.json();
    console.log(rawData);

    const transformedQuiz = {
            quizId: rawData.quizId,
            userId: rawData.userId,
            quizName: rawData.quizName,
            courseName: rawData.courseName,
            currQuestion: rawData.currQuestion,
            totalQuestions: rawData.questionOrder.length,
            questionOrder: rawData.questionOrder,
            selectedChoices: rawData.selectedChoices
    };

    return transformedQuiz; 
}

export const endQuiz = async (quizData) => {
    let endpoint = mainAddress + '/end/' + quizData.quizId;  

    const requestOptions = {
        method: 'PUT',
        // describes to the backend the type of incoming content
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData) // turns data into JSON format
    };

    console.log(requestOptions.body);

    const response = await fetch(endpoint, requestOptions);
    const quizResultData = await response.json();
    console.log(quizResultData);
    
    return quizResultData
}

/**
 * Gets a list of quiz status for certain users
 */
export const getQuizStatus = async () => {
    let endpoint = mainAddress + "/status/" + localStorage.getItem("courseId");

    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error('Something crashed: ' + response.statusText);
    }

    const rawData = await response.json();
    console.log(rawData);

    const transformedQuizStatusList = rawData.content.map((quizStatus) => {
        return {
            id: quizStatus.userId + ' / ' + quizStatus.quizId,
            name: quizStatus.firstName + ' ' + quizStatus.lastName, 
            quizName: quizStatus.quizName,
            attempts: quizStatus.attempts,
            highScore: quizStatus.highScore
        };
    });
    return transformedQuizStatusList
}    

/**
 * Gets the quiz bank based on the user's courses he is assigned to teach
 */
export const getQuizBank = async (courseId) => {
    let endpoint = mainAddress + "/course/" + courseId;

    
    // get data from endpoint (note: fetch(url) defaults to GET)
    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error('Something crashed: ' + response.statusText);
    }

    const rawData = await response.json();
    console.log(rawData);

    // Transform response object into data field 
    // for component's prop field
    const transformedQuizList = rawData.content.map((quiz) => {
        return {
            quizId: quiz.quizId,
            quizName: quiz.quizName,
            courseName: quiz.courseName
        };
    });

    return transformedQuizList;
}

export const addQuiz = async (quizData) => {
    let endpoint = mainAddress + "/quiz/add";        

    // 
    const requestOptions = {
        method: 'POST',
        // describes to the backend the type of incoming content
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData) // turns data into JSON format
    };

    const response = await fetch(endpoint, requestOptions);
    const data = await response.json();
    console.log(data);
}

export const updateQuizProgress = async (quizId) => {
    let endpoint = mainAddress + "/quiz/progress/update/" + quizId;        

    // 
    const requestOptions = {
        method: 'POST',
        // describes to the backend the type of incoming content
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData) // turns data into JSON format
    };        
}