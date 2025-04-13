const BASE_URL = 'http://localhost:8080'

export async function getProfile(creds:string){
    const response = await fetch(`${BASE_URL}/profile/${creds}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ⬅️ Important if backend sets HttpOnly cookies
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Login failed');
      }
    
      const data = await response.json();
      return data;
    
}