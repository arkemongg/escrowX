import { removeCookie } from "./cookies.js";
import { domainUrl } from "./urls.js";

// Fetch without JWT
export async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
// POST without JWT
export async function postData(url, bodyData) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You can add other headers here if needed
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

//Get with JWT

export async function fetchDataWithJwt(url, jwtToken) {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `JWT ${jwtToken}`, // Send JWT token in the header
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized: Token is invalid or expired
        removeCookie("user");
        // Display an alert to the user
        showAlert("Your session has expired. Please log in again.");
        // Redirect to the login page after 3 seconds
        setTimeout(() => {
          window.location = domainUrl + "/login.html";
        }, 2000);
      } else if (response.status === 429) {
        showAlert("Too many requests. Please try again later.");
      } else {
        return response.json()
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}


// PATCH WITH JWT 
export async function patchDataWithImageJWT(url, imageFile, jwtToken) {
  try {
    const formData = new FormData();

    // Append the JSON data as a regular field
    // formData.append('data', JSON.stringify(jsonData));

    // Append the image file to the FormData
    formData.append('profile', imageFile);

    const response = await fetch(url, {
      method: 'PUT', // or 'PATCH' if needed
      headers: {
        'Authorization': `JWT ${jwtToken}`,
      },
      body: formData, // Send the FormData object with both JSON data and the image
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized: Token is invalid or expired
        removeCookie("user");
        // Display an alert to the user
        showAlert("Your session has expired. Please log in again.");
        // Redirect to the login page after 3 seconds
        setTimeout(() => {
          window.location = domainUrl + "/login.html";
        }, 2000);
      } else if (response.status === 429) {
        showAlert("Too many requests. Please try again later.");
      } else {
        return response.json()
      }
    }
    return await response.json();
  } catch (error) {
    return error;
  }
}
export async function patchDataWithJWT(url, jsonData, jwtToken) {
  try {
    const response = await fetch(url, {
      method: 'PATCH', // Use PATCH for partial updates
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
        'Authorization': `JWT ${jwtToken}`,
      },
      body: JSON.stringify(jsonData), // Convert the JSON data to a string and send in the request body
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized: Token is invalid or expired
        removeCookie("user");
        // Display an alert to the user
        showAlert("Your session has expired. Please log in again.");
        // Redirect to the login page after 3 seconds
        setTimeout(() => {
          window.location = domainUrl+"/login.html";
        }, 2000);
      } else if (response.status === 429) {
        showAlert("Too many requests. Please try again later.");
      } else {
        return response.json()
      }
    }
    return await response.json();
  } catch (error) {
    return error;
  }
}

// POST DATA JWT
export async function postDataJWT(url, bodyData, jwtToken) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${jwtToken}`, // Send JWT token in the header
      },
      body: JSON.stringify(bodyData),
    });

    if (response.status === 204) {
      return { success: true };
    }

    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized: Token is invalid or expired
        removeCookie("user");
        // Display an alert to the user
        showAlert("Your session has expired. Please log in again.");
        // Redirect to the login page after 2 seconds
        setTimeout(() => {
          window.location = domainUrl + "/login.html";
        }, 2000);
      } else if (response.status === 429) {
        showAlert("Too many requests. Please try again later.");
      } else {
        const errorData = await response.json();
        console.log(errorData); // Log error data
        return errorData;
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Put Multiple Image JWT
export async function putMultipleImagesJWT(url, imageData, jwtToken) {
  try {
    const formData = new FormData();

    if (!imageData || typeof imageData !== 'object') {
      throw new Error('Invalid image data. Expecting an object.');
    }

    for (const key in imageData) {
      const imageFile = imageData[key];

      if (imageFile instanceof File) {
        formData.append(key, imageFile);
      } else {
        throw new Error(`Invalid image file for key: ${key}`);
        
      }
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `JWT ${jwtToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized: Token is invalid or expired
        removeCookie("user");
        // Display an alert to the user
        showAlert("Your session has expired. Please log in again.");
        // Redirect to the login page after 2 seconds
        setTimeout(() => {
          window.location = domainUrl + "/login.html";
        }, 2000);
      } else if (response.status === 429) {
        showAlert("Too many requests. Please try again later.");
      } else {
        const errorData = await response.json();
        console.log(errorData); // Log error data
        return errorData;
      }
    }

    return await response.json();
  } catch (error) {
    return error;
  }
}

function showAlert(message) {
  alert(message);
}
