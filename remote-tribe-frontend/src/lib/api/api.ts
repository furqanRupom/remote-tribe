// src/lib/apiClient.ts
import { goto } from '$app/navigation';

let accessToken = '';

export const setToken = (token: string) => {
    accessToken = token;
};

export const api = async (path: string, options: RequestInit = {}, retry = true): Promise<any> => {
    const base = 'http://localhost:4000/api/v1';
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken || localStorage.getItem('accessToken')}`,  
        ...options.headers
    };

    const res = await fetch(`${base}${path}`, {
        ...options,
        headers,
        credentials: 'include' // needed for sending refreshToken cookie
    });

    if (res.status === 401 && retry) {
        // try refresh
        const refreshRes = await fetch(`${base}/auth/refresh`, {
            method: 'POST',
            credentials: 'include'
        });

        if (refreshRes.ok) {
            const data = await refreshRes.json();
            accessToken = data.data.accessToken;
            return api(path, options, false); // retry once
        } else {
            goto('/login'); // logout
        }
    }

    if (!res.ok) {
        throw new Error((await res.json()).message || 'Something went wrong');
    }

    const data =  await res.json();
    return data.data
};
