/**
 * Contains methods for returning outputs or posting inputs related directly to quiz(s)
 */

const mainAddress = process.env.REACT_APP_SERVICE_BASE_API_URL + "/question";


/** 
 * Gets question bank summary. Pagination is applied. 
 * */ 
export const getQuestionBank = async () => {

    let endpoint = mainAddress + "/all/" + localStorage.getItem('courseId');

    const requestOptions = {
        method: 'GET',
        // describes to the backend the type of incoming content
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
    };

    // get data from endpoint (note: fetch(url) defaults to GET)
    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
        throw new Error('Something crashed: ' + response.statusText);
    }

    const rawData = await response.json();
    console.log(rawData);

    // Transform response object into data field 
    // for component's prop field
    const transformedQuestionList = rawData.content.map((question) => {
        return {
            questionId: question.questionId,
            courseName: question.courseName,
            topicName: question.topicName,
            questionBody: question.questionBody, 
            viewEdit: "VIEW / EDIT"
        };
    });

    return transformedQuestionList;
}

/**
 * Get individual question based on its id
 * @param {*} id - questionId
 * @returns Question Object
 */
export const getQuestion = async (id) => {
    
    let endpoint = mainAddress + "/" + id;

    const requestOptions = {
        method: 'GET',
        // describes to the backend the type of incoming content
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
    };

    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
        throw new Error('Something crashed: ' + response.statusText);
    }

    const rawData = await response.json();
    console.log(rawData);    
    
    return {
            questionBody: rawData.questionBody, 
            choice1: rawData.choice1,
            choice2: rawData.choice2,
            choice3: rawData.choice3,
            choice4: rawData.choice4,
        };
}

export const addNewQuestion = async (id) => {
    let endpoint = mainAddress + "/add/" + id;

    console.log(id);
    // 
    const requestOptions = {
        method: 'POST',
        // describes to the backend the type of incoming content
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id), // turns data into JSON format
        mode: 'cors'
    };

    const response = await fetch(endpoint, requestOptions);
    const data = await response.json();
    console.log(data);
}

/**
 * Update an existing question in the question bank
 * @param {*} id 
 */
export const updateQuestion = async (id) => {
    let endpoint = mainAddress + "/update/" + id;

    console.log(id);
    
    const requestOptions = {
        method: 'PUT',
        // describes to the backend the type of incoming content
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id), // turns data into JSON format
        mode: 'cors'
    };

    const response = await fetch(endpoint, requestOptions);
    const data = await response.json();
    console.log(data);
}


export const getCurrQuestion = async (userId, quizId) => {
    let endpoint = mainAddress + "/answer" + id + "/delete";
}

// PUT request to update selected choice
export const updateCurrQuestionSelectedChoice = async (userId, quizId, questionNo, choice) => {
    let endpoint = mainAddress + "/answer?userId=" + userId + "&quizId=" + quizId + "&questionNo=" + questionNo + "&choice=" + choice;

    const requestOptions = {
        method: 'PUT',
        // describes to the backend the type of incoming content
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
    };

    const response = await fetch(endpoint, requestOptions);
    const data = await response.json();
    console.log(data);
}

export const getPrevQuestion = async (userId, quizId, currQuestionNo) => {
    let endpoint = mainAddress + "/" + id + "/delete";
}

export const getNextQuestion = async (userId, quizId, currQuestionNo) => {
    let endpoint = mainAddress + "/" + id + "/delete";
}

export const flagQuestionForDeletion = async (id) => {
    let endpoint = mainAddress + "/" + id + "/delete";
}