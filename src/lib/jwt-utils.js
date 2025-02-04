import {jwtDecode} from 'jwt-decode';

export function isJwtExpired(jwtToken) { //Client Side Check - Optional
    if (!jwtToken) {
        return true; // No token, treat as expired
    }

    try {
        const decodedToken = jwtDecode(jwtToken);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error("JWT decode error:", error);
        return true; // Treat as expired on error
    }
}