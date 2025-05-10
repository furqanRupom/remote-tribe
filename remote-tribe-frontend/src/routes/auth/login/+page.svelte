<script lang="ts">
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { auth } from '../../../stores/auth';
	import { setToken } from '$lib/api/api';

	let email = '';
	let password = '';
	let error = '';
	let loading = false;
	let showPassword = false;

	async function handleSubmit(event: Event) {
		event.preventDefault();
		loading = true;
		error = '';

		try {
			const response = await fetch('http://localhost:4000/api/v1/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					password
				}),
        credentials: 'include'
			});

			const data = await response.json();
			//   data.data.accessToken
			// data.data.refreshToken

			if (!response.ok) {
				throw new Error(data.message || 'Login failed');
			}

			if (response.ok) {
				setToken(data.data.accessToken);
        localStorage.setItem('accessToken', data.data.accessToken);
			}

			// Redirect on successful login
			goto('/job-seeker'); // Change to your desired redirect path
		} catch (err) {
			error = err instanceof Error ? err.message : 'Login failed. Please try again.';
			toast.error(error);
		} finally {
			loading = false;
		}
	}

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}
</script>

{#if error}
	<div
		class="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200"
	>
		{error}
	</div>
{/if}

<form on:submit={handleSubmit} class="space-y-6">
	<!-- Email field -->
	<div>
		<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
			Email address
		</label>
		<div class="mt-1">
			<input
				id="email"
				name="email"
				type="email"
				autocomplete="email"
				required
				bind:value={email}
				class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 focus:outline-none sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
			/>
		</div>
	</div>

	<!-- Password field with eye icon -->
	<div>
		<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
			Password
		</label>
		<div class="relative mt-1">
			<input
				id="password"
				name="password"
				type={showPassword ? 'text' : 'password'}
				autocomplete="current-password"
				required
				bind:value={password}
				class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 focus:outline-none sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
			/>
			<button
				type="button"
				on:click={togglePasswordVisibility}
				class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
			>
				{#if showPassword}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Remember me and forgot password -->
	<div class="flex items-center justify-between">
		<div class="flex items-center">
			<input
				id="remember-me"
				name="remember-me"
				type="checkbox"
				class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700"
			/>
			<label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
				Remember me
			</label>
		</div>

		<div class="text-sm">
			<a
				href="/auth/forgot-password"
				class="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
			>
				Forgot your password?
			</a>
		</div>
	</div>

	<!-- Submit button -->
	<div>
		<button
			type="submit"
			disabled={loading}
			class="flex w-full justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
		>
			{#if loading}
				<svg
					class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				Signing in...
			{:else}
				Sign in
			{/if}
		</button>
	</div>
</form>

<!-- Social login buttons -->
<div class="mt-6">
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
		</div>
		<div class="relative flex justify-center text-sm">
			<span class="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
				Or continue with
			</span>
		</div>
	</div>

	<div class="mt-6 grid grid-cols-2 gap-3">
		<div>
			<a
				href="#"
				class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
			>
				<span class="sr-only">Sign in with Google</span>
				<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path
						d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
					/>
				</svg>
			</a>
		</div>

		<div>
			<a
				href="#"
				class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
			>
				<span class="sr-only">Sign in with GitHub</span>
				<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
						clip-rule="evenodd"
					/>
				</svg>
			</a>
		</div>
	</div>
</div>
