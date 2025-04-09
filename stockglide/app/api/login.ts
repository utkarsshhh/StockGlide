const BASE_URL = 'http://localhost:8080'

export async function validateLogin(creds){
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds),
        credentials: 'include', // ⬅️ Important if backend sets HttpOnly cookies
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }
    
      const data = await response.json();
      return data;
    
}