<script>
	let mobileMenuOpen = false;
</script>

<header class="bg-white shadow-sm dark:bg-gray-900">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex">
				<div class="flex flex-shrink-0 items-center">
					<a href="/" class="flex items-center">
						<span class="text-2xl font-bold text-orange-600 dark:text-orange-400">RemoteTribe</span>
					</a>
				</div>
				<nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
					<a
						href="/jobs"
						class="inline-flex items-center border-b-2 border-orange-500 px-1 pt-1 text-sm font-medium text-gray-900 dark:text-white"
						>Jobs</a
					>
					<a
						href="/companies"
						class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
						>Companies</a
					>
					<a
						href="/resources"
						class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
						>Resources</a
					>
				</nav>
			</div>
			<div class="hidden sm:ml-6 sm:flex sm:items-center">
				<a
					href="/auth/login"
					class="rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-200"
					>Sign in</a
				>
				<a
					href="/auth/register"
					class="ml-4 rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
					>Sign up</a
				>
			</div>
			<div class="-mr-2 flex items-center sm:hidden">
				<button
					on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
					class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none focus:ring-inset"
				>
					<span class="sr-only">Open main menu</span>
					{#if mobileMenuOpen}
						<!-- Close icon -->
						<svg
							class="block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					{:else}
						<!-- Menu icon -->
						<svg
							class="block h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div class="sm:hidden">
			<div class="space-y-1 pt-2 pb-3">
				<a
					href="/jobs"
					class="block border-l-4 border-orange-500 bg-orange-50 py-2 pr-4 pl-3 text-base font-medium text-orange-700"
					>Jobs</a
				>
				<a
					href="/companies"
					class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
					>Companies</a
				>
				<a
					href="/resources"
					class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
					>Resources</a
				>
			</div>
			<div class="border-t border-gray-200 pt-4 pb-3">
				<div class="mt-3 space-y-1">
					<a
						href="/auth/login"
						class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
						>Sign in</a
					>
					<a
						href="/auth/register"
						class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
						>Sign up</a
					>
				</div>
			</div>
		</div>
	{/if}
</header>
