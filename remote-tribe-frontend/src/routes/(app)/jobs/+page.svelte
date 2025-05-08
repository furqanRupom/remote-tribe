<script lang="ts">
	import Job from "$lib/app/Job.svelte";
  let jobs = [
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
  ]
</script>
<section>
    <Job job={jobs}/>
</section>