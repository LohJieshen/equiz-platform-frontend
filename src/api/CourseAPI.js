const CourseAPI = () => {

    const mainAddress = "http://localhost:8080/api";

    const getCourseList = async () => {
        let endpoint = mainAddress + "/course-list";

        const response = await fetch(endpoint);

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