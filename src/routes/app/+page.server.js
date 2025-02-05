// import { redirect } from '@sveltejs/kit';
// import { isJwtExpired } from '$lib/jwt-utils.js';
// import {API_BASE_URL} from '$env/static/private';
//  // Import if you're using client-side check too

// export async function load({cookies }) {
//     const jwtToken = cookies.get('jwt'); // or event.request.headers.get('Authorization') if you are using header

//     if (!jwtToken) {
//         throw redirect(303, '/login'); // Redirect to login if no token
//     }

//     //Optional Client Side Check - useful for better UX - redirect immediately if token is surely expired.
//     if (isJwtExpired(jwtToken)) {
//         cookies.delete('jwt', { path: '/' }); // Clear the expired cookie
//         throw redirect(303, '/login');
//     }

//     try {
//         const response = await fetch(`${API_BASE_URL}/api/auth/verify`, { // Your Spring Boot endpoint
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${jwtToken}`
//             },
//         });


//         if (!response.ok) {
//             cookies.delete('jwt', { path: '/' }); // Clear invalid token
//             throw redirect(303, '/login'); // Redirect to login if server verification fails
//         }
//     } catch (error) {
//         if (error.status === 303) { // Check if it's a redirect error
//             throw error; // Re-throw the redirect error to let SvelteKit handle it
//         }
//         console.error('Error in load function:', error);
//         cookies.delete('jwt', { path: '/' }); // Clear if any error occurs
//         throw redirect(303, '/login'); // Redirect to login on any error
//     }
// }