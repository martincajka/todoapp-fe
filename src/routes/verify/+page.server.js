import { redirect } from '@sveltejs/kit';
import { API_BASE_URL } from '$env/static/private';

export const load = async ({ url }) => {
    const token = url.searchParams.get('token');
    if (!token) throw redirect(303, '/');

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/verify-registration`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: token});
        const data = await response.json();
        
        if (!response.ok) {
            throw redirect(303, '/login?error=verification-failed');
        }
        const encodedEmail = encodeURIComponent(data.email);
        const redirectUrl = `/login?email=${encodedEmail}&verified=true`;        
        throw redirect(303, redirectUrl);

    } catch (error) {
        if (error.status === 303) { // Check if it's a redirect error
            throw error; // Re-throw the redirect error to let SvelteKit handle it
        } else {
            console.error('Fetch error:', error);
            throw redirect(303, '/login?error=verification-failed'); // Redirect on other errors
        }
    }
};