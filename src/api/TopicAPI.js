
const mainAddress = "http://localhost:8080/api/topics"

const getTopicsByCourseId = async (courseId) => {
    let endpoint = mainAddress + "/" + courseId;

    const response = await fetch(endpoint);

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