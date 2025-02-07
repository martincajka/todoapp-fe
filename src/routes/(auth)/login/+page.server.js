import {redirect} from '@sveltejs/kit';
import {API_BASE_URL} from '$env/static/private';

export const actions = {
    default: async ({request, cookies}) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            // Debug response
            const data = await response.json();

            if (!response.ok) {
                const errorMsg = data.detail || 'Unknown error';
                console.error(
                    'Login failed:',
                    response.status,
                    errorMsg
                  );
                return {
                    error: errorMsg,
                    email: email
                };
            }

            const token = data.jwt;

            cookies.set('jwt', token, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            })

            throw redirect(303, '/app');    
        } catch (error) {
            if (error.status === 303) { // Check if it's a redirect error
                throw error; // Re-throw the redirect error to let SvelteKit handle it
            } else {
            console.error('An error occurred:', error);
            return {
                error: "An error occurred",
                email: email
            };
        }
        }
    }
};