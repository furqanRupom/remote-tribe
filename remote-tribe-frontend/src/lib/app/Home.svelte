<script>
	import { fade } from 'svelte/transition';

	// Sample featured jobs data
	const featuredJobs = [
		{
			id: 1,
			title: 'Senior Frontend Developer',
			company: 'TechCorp',
			location: 'Remote (Worldwide)',
			type: 'Full-time',
			salary: '$90,000 - $120,000',
			posted: '2 days ago',
			tags: ['React', 'TypeScript', 'Svelte']
		},
		{
			id: 2,
			title: 'DevOps Engineer',
			company: 'CloudSystems',
			location: 'Remote (US/EU)',
			type: 'Contract',
			salary: '$70 - $90/hr',
			posted: '1 week ago',
			tags: ['AWS', 'Terraform', 'Kubernetes']
		},
		{
			id: 3,
			title: 'UX Designer',
			company: 'DesignHub',
			location: 'Remote (Anywhere)',
			type: 'Full-time',
			salary: '$80,000 - $100,000',
			posted: '3 days ago',
			tags: ['Figma', 'UI/UX', 'Prototyping']
		}
	];
</script>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-white dark:bg-gray-900">
	<div
		class="absolute inset-0 bg-gradient-to-r from-orange-100 to-purple-100 opacity-75 blur-3xl dark:from-gray-900 dark:to-slate-800"
	></div>

	<div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
		<div class="text-center">
			<h1 class="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl dark:text-white">
				<span class="block">Find Your Dream</span>
				<span class="block text-orange-600 dark:text-orange-400">Remote Job</span>
			</h1>
			<p class="mx-auto mt-6 max-w-lg text-xl text-gray-500 dark:text-gray-300">
				Join thousands of professionals working remotely from anywhere in the world.
			</p>
			<div class="mt-10 flex justify-center gap-4">
				<a
					href="/auth/register"
					class="rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-orange-700 md:px-10 md:py-4 md:text-lg"
				>
					Get Started
				</a>
				<a
					href="/jobs"
					class="rounded-md border border-transparent bg-orange-100 px-8 py-3 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-700 md:px-10 md:py-4 md:text-lg dark:bg-gray-900 dark:text-white"
				>
					Browse Jobs
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="bg-gray-50 py-12 dark:bg-gray-900">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="lg:text-center">
			<h2
				class="text-base font-semibold tracking-wide text-orange-600 uppercase dark:text-orange-400"
			>
				Features
			</h2>
			<p
				class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
			>
				A better way to work remotely
			</p>
			<p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto dark:text-gray-300">
				Everything you need to find or post remote jobs worldwide.
			</p>
		</div>

		<div class="mt-10">
			<div class="space-y-10 md:grid md:grid-cols-2 md:space-y-0 md:gap-x-8 md:gap-y-10">
				<div class="relative" transition:fade>
					<div
						class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-orange-500 text-white"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
							/>
						</svg>
					</div>
					<p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
						Global Opportunities
					</p>
					<p class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
						Access remote jobs from companies all over the world, regardless of your location.
					</p>
				</div>

				<div class="relative" transition:fade>
					<div
						class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-orange-500 text-white"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
						Flexible Work
					</p>
					<p class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
						Find jobs that fit your schedule - full-time, part-time, or freelance.
					</p>
				</div>

				<div class="relative" transition:fade>
					<div
						class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-orange-500 text-white"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
							/>
						</svg>
					</div>
					<p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
						Verified Listings
					</p>
					<p class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
						All jobs are manually reviewed to ensure quality and legitimacy.
					</p>
				</div>

				<div class="relative" transition:fade>
					<div
						class="absolute flex h-12 w-12 items-center justify-center rounded-md bg-orange-500 text-white"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
					</div>
					<p class="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Community</p>
					<p class="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
						Join a tribe of remote workers sharing tips, resources, and opportunities.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Featured Jobs -->
<section class="bg-white py-12 dark:bg-gray-900">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-10 lg:text-center">
			<h2
				class="text-base font-semibold tracking-wide text-orange-600 uppercase dark:text-orange-400"
			>
				Jobs
			</h2>
			<p
				class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
			>
				Featured Remote Jobs
			</p>
			<p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto dark:text-gray-300">
				Hand-picked opportunities from top remote companies
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each featuredJobs as job}
				<div
					transition:fade
					class="overflow-hidden rounded-lg bg-white shadow transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800"
				>
					<div class="px-6 py-4">
						<div class="flex items-center justify-between">
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">{job.title}</h3>
							<span
								class="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-800 dark:bg-orange-800 dark:text-orange-100"
								>{job.type}</span
							>
						</div>
						<p class="mt-2 text-gray-600 dark:text-gray-300">{job.company}</p>
						<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{job.location}</p>
						<p class="mt-2 font-medium text-orange-600 dark:text-orange-400">{job.salary}</p>
						<div class="mt-4 flex flex-wrap gap-2">
							{#each job.tags as tag}
								<span
									class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200"
									>{tag}</span
								>
							{/each}
						</div>
					</div>
					<div
						class="border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-600 dark:bg-gray-700"
					>
						<div class="flex items-center justify-between">
							<span class="text-sm text-gray-500 dark:text-gray-300">Posted {job.posted}</span>
							<a
								href={`/jobs/${job.id}`}
								class="text-sm font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
							>
								View details →
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-10 text-center">
			<a
				href="/jobs"
				class="inline-flex items-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700"
			>
				View all jobs
				<svg
					class="-mr-1 ml-3 h-5 w-5"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="bg-gray-900 dark:bg-gray-900">
	<div class="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
		<h2 class="text-3xl font-extrabold text-white sm:text-4xl">
			<span class="block">Ready to join the remote revolution?</span>
		</h2>
		<p class="mt-4 text-lg leading-6 text-orange-200">
			Whether you're looking for remote work or hiring remote talent, we've got you covered.
		</p>
		<a
			href="/auth/register"
			class="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-orange-600 hover:bg-orange-50 sm:w-auto"
		>
			Sign up for free
		</a>
	</div>
</section>
