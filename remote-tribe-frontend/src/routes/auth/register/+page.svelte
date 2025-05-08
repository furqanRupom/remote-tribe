<script lang="ts">
  import { goto } from '$app/navigation';
  import { toast, Toaster } from 'svelte-sonner';

  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let error = '';
  let loading = false;
  let showPassword = false;
  let showConfirmPassword = false;

  async function handleSubmit(event: Event) {
    event.preventDefault();
    loading = true;
    error = '';

    // Client-side validation
    if (password !== confirmPassword) {
      error = 'Passwords do not match';
      loading = false;
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || 'Registration failed');
      }

      if (response.ok) {
        goto('/auth/verify');
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Registration failed. Please try again.';
    } finally {
      loading = false;
    }
  }

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }

  function toggleConfirmPasswordVisibility() {
    showConfirmPassword = !showConfirmPassword;
  }
</script>

{#if error}
  <div class="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
    {error}
  </div>
{/if}

<form on:submit={handleSubmit} class="space-y-6">
  <!-- Name field -->
  <div>
    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Full name
    </label>
    <div class="mt-1">
      <input
        id="name"
        name="name"
        type="text"
        autocomplete="name"
        required
        bind:value={name}
        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 focus:outline-none sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
      />
    </div>
  </div>

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
    <div class="mt-1 relative">
      <input
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        autocomplete="new-password"
        required
        bind:value={password}
        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 focus:outline-none sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
      />
      <button
        type="button"
        on:click={togglePasswordVisibility}
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
      >
        {#if showPassword}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        {/if}
      </button>
    </div>
  </div>

  <!-- Confirm Password field with eye icon -->
  <div>
    <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Confirm Password
    </label>
    <div class="mt-1 relative">
      <input
        id="confirmPassword"
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        autocomplete="new-password"
        required
        bind:value={confirmPassword}
        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:ring-orange-500 focus:outline-none sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500"
      />
      <button
        type="button"
        on:click={toggleConfirmPasswordVisibility}
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
      >
        {#if showConfirmPassword}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        {/if}
      </button>
    </div>
  </div>

  <!-- Terms checkbox -->
  <div class="flex items-center">
    <input
      id="terms"
      name="terms"
      type="checkbox"
      required
      class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700"
    />
    <label for="terms" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
      I agree to the <a
        href="/terms"
        class="text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
        >Terms of Service</a
      >
      and
      <a
        href="/privacy"
        class="text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
        >Privacy Policy</a
      >
    </label>
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
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Registering...
      {:else}
        Register
      {/if}
    </button>
  </div>
  
  <!-- Toaster -->
  <Toaster 
    position="top-right"
    expand={false}
    duration={4000}
    closeButton
    richColors
    visibleToasts={3}
    toastOptions={{
      style: "background: #111827; border: 1px solid #1f2937; color: #ea580c;",
    }}
  />
</form>