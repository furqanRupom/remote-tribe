<!-- src/routes/dashboard/+layout.svelte -->
<script lang="ts">
    import Sidebar from '$lib/components/dashboard/Sidebar.svelte';
    import Topbar from '$lib/components/dashboard/Topbar.svelte';
    import { userProfile } from '$lib/stores/userProfile';
    import { fade } from 'svelte/transition';
  
    // User data from layout load
    $: user = $userProfile
  </script>
  
  <div class="flex min-h-screen bg-gray-900">
    <Sidebar user={user} />
    
    <div class="flex-1 min-h-screen md:ml-[260px]">
      <Topbar user={user} />
      
      <main class="p-8 mt-[70px]">
        <slot />
      </main>
    </div>
  </div>