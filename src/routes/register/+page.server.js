import { API_BASE_URL } from '$env/static/private';


export const actions ={
    
    default: async ( {request}) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        console.log('API url:', API_BASE_URL);

        try{
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, confirmPassword})
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "Registration failed:",
                response.status,
                data.detail || "Unknown error"
              );
            return {
                success: false,
                message: data.detail || "Registration failed. Please try again.",
                email: email
        }
    }

        return {
            success: true,
            message: data.message};
    } catch (error) {
        console.error("An error occurred", error);
        return {
            success: false,
            message: "An error occurred",
            email: email
        };
    }
}
}