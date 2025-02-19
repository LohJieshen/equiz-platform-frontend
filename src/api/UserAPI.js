/**
 * Contains a library of endpoints pertaining to communicating with the backend for user management, such as verification and retrieval of information.
 */

const mainAddress = "http://localhost:8080/api/user";

/**
 * Authenticate the user's login
 * @param {*} userId 
 * @param {*} password 
 * @returns 
 */
export const authenticateUserLogin = async (userId, password) => {
    let endpoint = mainAddress + "/login";

    // This must match what the backend expects.
    const loginInfo = {
        "userId": userId,
        "password": password
    };

    const requestOptions = {
        method: 'PUT',
        // describes to the backend the type of incoming content
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo), // turns data into JSON format
        credentials: 'include'
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return response;
    } catch (error) {
        console.error('Failed to fetch:', error);
        return { ok: false, error: error.message }; // Return a response-like object indicating failure
    }
};

/**
 * Gets Basic User Info, consisting of user's first name, and last login date.
 * The function also saves courseId to localStorage
 * @param {*} userId 
 * @returns 
 */
export const getUserBasicInfo = async (userId) => {
    let endpoint = mainAddress + "/basic-info/" + userId;

        const requestOptions = {
            method: 'GET',
            // describes to the backend the type of incoming content
            headers: { 'Content-Type': 'application/json' },
        };

    try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        
        localStorage.setItem("courseId", data.courseId);

        let userRole;

        if (data.lecturer) {
            userRole = "Lecturer";
        }
        else {
            userRole = "Student";
        }

        const transformedData = {
            firstName: data.firstName,
            role: userRole,
            lastLoginDate: data.lastLoginDate
        };
            
        return transformedData;

    } catch (error) {
        console.error('Failed to fetch:', error);
        return { ok: false, error: error.message }; // Return a response-like object indicating failure
    }
}

export const hasLecturerAccess = async () => {
    let endpoint = mainAddress + "/check-lecturer/" + localStorage.getItem("userId");

    const requestOptions = {
        method: 'GET',
        // describes to the backend the type of incoming content
        headers: { 'Content-Type': 'application/json' },
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error('Failed to fetch:', error);
        return { ok: false, error: error.message }; // Return a response-like object indicating failure
    }
}