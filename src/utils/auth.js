const headers = new Headers();
headers.append('Authorization', localStorage.getItem('token'));
headers.append('Content-Type', 'application/json');

export const loginUser = async () => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Conent-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            },
        );
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Login failed');
        }
        const { token } = await res.json();
        localStorage.setItem('token', token);
        console.log('Login successful! Token saved.');
    } catch (error) {
        console.error('Login error:', error.message);
    }
};
