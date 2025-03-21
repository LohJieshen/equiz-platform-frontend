
const mainAddress = process.env.REACT_APP_SERVICE_BASE_API_URL + "/topics";

const getTopicsByCourseId = async (courseId) => {
    let endpoint = mainAddress + "/" + courseId;

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

    // Transform response object into data field 
    // for component's prop field
    const transformedQuizList = rawData.map((topicData) => {
        return {
            topic_id: topicData.topic_id,
            topic_name: topicData.topic_name
        };
    });
}

const addTopic = async () => {

}

export default TopicAPI;