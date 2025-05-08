<script>
	import { page } from '$app/stores';
</script>

<div
	class="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8 dark:bg-gray-900"
>
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<a href="/" class="flex justify-center">
			<span class="text-3xl font-bold text-orange-600 dark:text-orange-400">RemoteTribe</span>
		</a>
		<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
			{#if $page.url.pathname.startsWith('/auth/login')}
				Sign in to your account
			{:else if $page.url.pathname.startsWith('/auth/register')}
				Create a new account
			{:else if $page.url.pathname.startsWith('/auth/verify')}
				Verify your email
			{/if}
		</h2>
		{#if $page.url.pathname.startsWith('/auth/login')}
			<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
				Or{' '}
				<a
					href="/auth/register"
					class="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
				>
					create a new account
				</a>
			</p>
		{:else if $page.url.pathname.startsWith('/auth/register')}
			<p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
				Or{' '}
				<a
					href="/auth/login"
					class="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
				>
					sign in to existing account
				</a>
			</p>
		{/if}
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white px-4 py-8 shadow-md sm:rounded-lg sm:px-10 dark:bg-gray-900">
			<slot />
      
		</div>
	</div>
</div>
