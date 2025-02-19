
export const initState = {
    mode: 'add',
    title: 'Add Question',
    formData: {
        courseName: '',
        topicName: '',
        questionBody: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        correctAns: '1'
    }
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_MODE':
            return {...state, mode: action.payload};
        case 'SET_TITLE':
            return {...state, title: action.payload};
        case 'SET_DATA':
            return {...state, formData: action.payload};
        default:
            return state;
    }
}