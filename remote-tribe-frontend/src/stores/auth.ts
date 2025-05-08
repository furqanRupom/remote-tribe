import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type AuthData = {
    accessToken: string | null;
    refreshToken: string | null;
};

const initialAuth: AuthData = {
    accessToken: null,
    refreshToken: null
};

// Create the store
const authStore = writable<AuthData>(initialAuth);

// Initialize from localStorage if in browser
if (browser) {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
        authStore.set(JSON.parse(storedAuth));
    }
}

// Custom store with methods
export const auth = {
    subscribe: authStore.subscribe,
    setTokens: (tokens: { accessToken: string; refreshToken: string }) => {
        authStore.set(tokens);
        if (browser) {
            localStorage.setItem('auth', JSON.stringify(tokens));
        }
    },
    clear: () => {
        authStore.set(initialAuth);
        if (browser) {
            localStorage.removeItem('auth');
        }
    }
};