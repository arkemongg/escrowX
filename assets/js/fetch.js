import { removeCookie } from "./cookies.js";

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

export async function fetchDataWithJwt(url,jwtToken) {
  try {
      const response = await fetch(url, {
          headers: {
              Authorization: `JWT ${jwtToken}`, // Send JWT token in the header
          },
      });

      if (!response.ok) {
          removeCookie("user")
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      return null;
  }
}