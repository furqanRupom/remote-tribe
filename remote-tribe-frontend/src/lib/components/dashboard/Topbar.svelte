<!-- src/lib/components/dashboard/Topbar.svelte -->
<script lang="ts">
    import { page } from '$app/stores';
	import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    
    export let user;
    
    let dropdownOpen = false;
    let dropDownOpenAvatar = false;
    let notifications:{ id: number, text: string, read: boolean, time: string }[] = [];
    let unreadCount = 0;
    
    onMount(async () => {
      notifications = [
        { id: 1, text: 'New job matches your profile', read: false, time: '2h ago' },
        { id: 2, text: 'Application viewed by employer', read: true, time: '1d ago' }
      ];
      unreadCount = notifications.filter(n => !n.read).length;
    });
    
    function toggleDropdown() {
      dropdownOpen = !dropdownOpen;
    }
    function toggleDropdownAvatar() {
      dropDownOpenAvatar = !dropDownOpenAvatar;
    }
    
    function markAllAsRead() {
      notifications = notifications.map(n => ({ ...n, read: true }));
      unreadCount = 0;
    }
    
    function handleLogout() {
      window.location.href = '/logout';
    }
  </script>
  
  <header class="fixed top-0 right-0 left-64 h-16 bg-gray-900 shadow-sm z-40 flex items-center justify-between px-6 md:px-8">
    <!-- Search Bar -->
    <div class="hidden md:flex items-center bg-gray-800 rounded-lg px-4 py-2 w-80">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input 
        type="text" 
        placeholder="Search..." 
        class="bg-transparent border-none focus:ring-0 w-full text-sm outline-none text-gray-300"
      />
    </div>
    
    <!-- Right Side Actions -->
    <div class="flex items-center space-x-4">
      <!-- Notifications -->
      <div class="relative">
        <button 
          on:click={toggleDropdown}
          class="p-1 text-gray-500 hover:text-gray-700 relative"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {#if unreadCount > 0}
            <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </span>
          {/if}
        </button>
        
        {#if dropdownOpen}
          <div 
            transition:fly={{ y: -10 }}
            class="absolute right-0 mt-2 w-80 bg-gray-900 text-gray-300 rounded-md shadow-lg overflow-hidden z-50"
          >
            <div class="flex items-center justify-between px-4 py-3 border-b">
              <h4 class="font-medium text-gray-300">Notifications</h4>
              <button 
                on:click={markAllAsRead}
                class="text-sm text-orange-600 hover:text-orange-800"
              >
                Mark all as read
              </button>
            </div>
            
            <div class="max-h-96 overflow-y-auto">
              {#each notifications as notification}
                <div 
                  class="px-4 py-3 border-b bg-gray-800 text-gray-300 flex items-start"
                  class:bg-gray-50={!notification.read}
                >
                  <div 
                    class="mt-1 mr-3 h-2 w-2 rounded-full"
                    class:bg-blue-500={!notification.read}
                    class:bg-gray-300={notification.read}
                  />
                  <div>
                    <p class="text-sm text-gray-300">{notification.text}</p>
                    <p class="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
      
      <!-- User Menu -->
      <div class="relative">
        <button 
          on:click={toggleDropdownAvatar}
          class="flex items-center space-x-2 focus:outline-none"
        >
          {#if user?.avatar}
            <img 
              src={user.avatar} 
              alt={user.name} 
              class="h-8 w-8 rounded-full object-cover"
            />
          {:else}
            <div class="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-gray-900 font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
          {/if}
          <span class="hidden md:inline text-sm font-medium text-gray-300">
            {user?.name || 'User'}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {#if dropDownOpenAvatar}
          <div 
            transition:fly={{ y: -10 }}
            class="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-50"
          >
            <a 
              href="/dashboard/profile" 
              class=" px-4 py-2 text-sm text-gray-300  flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </a>
            <a 
              href="/settings" 
              class=" px-4 py-2 text-sm text-gray-300  flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </a>
            <div class="border-t border-gray-200 my-1"></div>
            <button 
              on:click={handleLogout}
              class=" w-full text-left px-4 py-2 text-sm text-gray-300  flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        {/if}
      </div>
    </div>
  </header>