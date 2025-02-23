const CourseAPI = () => {

    const mainAddress = process.env.REACT_APP_SERVICE_BASE_API_URL;

    const getCourseList = async () => {
        let endpoint = mainAddress + "/course-list";

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
        const transformedCourseList = rawData.map((courseData) => {
            return {
                course_id: courseData.course_id,
                course_name: courseData.course_name, 
            };
        });

        return transformedCourseList;
    }

}

export default CourseAPI