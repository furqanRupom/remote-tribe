import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

// Define User type
type User = {
    name: string;
    email: string;
    role: string;
};

export const userProfile: Writable<User | null> = writable(null);

