<script>
	export let job;
</script>

<li>
	<a href={`/jobs/${job.id}`} class="block hover:bg-gray-50 dark:hover:bg-gray-700">
		<div class="px-4 py-4 sm:px-6">
			<div class="flex items-center justify-between">
				<p class="truncate text-sm font-medium text-orange-600 dark:text-orange-400">{job.title}</p>
				<div class="ml-2 flex flex-shrink-0">
					<p
						class="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800 dark:bg-green-900 dark:text-green-200"
					>
						{job.type}
					</p>
				</div>
			</div>
			<div class="mt-2 sm:flex sm:justify-between">
				<div class="sm:flex">
					<p class="flex items-center text-sm text-gray-500 dark:text-gray-400">
						<svg
							class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h11-2V5zm2 4h-2v2h2V9z"
								clip-rule="evenodd"
							/>
						</svg>
						{job.company}
					</p>
					<p
						class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6 dark:text-gray-400"
					>
						<svg
							class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
								clip-rule="evenodd"
							/>
						</svg>
						{job.location}
					</p>
				</div>
				<div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
					<svg
						class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
							clip-rule="evenodd"
						/>
					</svg>
					<p>
						Posted <time datetime="2020-01-07">{job.posted}</time>
					</p>
				</div>
			</div>
			<div class="mt-2 flex flex-wrap gap-2">
				{#each job.tags as tag}
					<span
						class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800 dark:bg-gray-600 dark:text-gray-200"
						>{tag}</span
					>
				{/each}
			</div>
		</div>
	</a>
</li>
