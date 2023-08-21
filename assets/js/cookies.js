function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            const encodedValue = cookie.substring(name.length + 1);
            const decodedValue = decodeURIComponent(encodedValue);
            
            // Parse the JSON string into an object
            try {
                return JSON.parse(decodedValue);
            } catch (error) {
                console.error('Error parsing JSON from cookie:', error);
            }
        }
    }
    return null;
}

export function setCookie(name, value, expirationDays = 1) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);

    // Serialize the combined data into a JSON string
    const serializedValue = JSON.stringify(value);

    // URL-encode the JSON string
    const encodedValue = encodeURIComponent(serializedValue);

    const cookieValue = `${name}=${encodedValue}; SameSite=None; Secure; expires=${expirationDate.toUTCString()}`;
    document.cookie = cookieValue;
}

export function removeCookie(name) {
    const pastExpiration = new Date();
    pastExpiration.setDate(pastExpiration.getDate() - 1);

    const cookieValue = `${name}=; expires=${pastExpiration.toUTCString()}`;
    document.cookie = cookieValue;
}

export const userAndToken = getCookie("user");
