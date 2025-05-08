<script lang="ts">
  import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
  import { fade } from 'svelte/transition';

  // Form fields
  let verificationCode = '';
  let digits = Array(6).fill('');
  let activeInput = 0;
  let inputRefs: HTMLInputElement[] = [];

  // State management
  let loading = writable(false);
  let errorMessage = writable('');
  let successMessage = writable('');

  // Handle digit input
  const handleDigitInput = (e: InputEvent, index: number) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    
    if (!/^\d*$/.test(value)) {
      target.value = '';
      digits[index] = '';
      return;
    }
    
    digits[index] = value;
    verificationCode = digits.join('');
    
    if (value && index < 5) {
      activeInput = index + 1;
      inputRefs[activeInput]?.focus();
    }
    
    if (verificationCode.length === 6) {
      verifyCode();
    }
  };

  // Handle backspace
  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      activeInput = index - 1;
      inputRefs[activeInput]?.focus();
    }
  };

  // API call to verify code
  const verifyCode = async () => {
    if (verificationCode.length !== 6) return;
    
    loading.set(true);
    errorMessage.set('');
    
    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: verificationCode
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Invalid verification code');
      }
      
      successMessage.set('Email verified successfully!');
      
      if(response.ok) {
        goto('/auth/login');
      }
      
    } catch (err) {
      errorMessage.set(err.message || 'Verification failed. Please try again.');
      
      // Clear inputs on error
      digits = Array(6).fill('');
      verificationCode = '';
      activeInput = 0;
      inputRefs[0]?.focus();
      
    } finally {
      loading.set(false);
    }
  };
</script>

<div class="w-full max-w-md mx-auto p-6 rounded-xl">
  {#if $errorMessage}
    <div transition:fade class="mb-4 p-3 bg-gray-900 text-red-600 rounded-lg text-sm">
      {$errorMessage}
    </div>
  {/if}
  
  {#if $successMessage}
    <div transition:fade class="mb-4 p-3 bg-gray-900 text-green-600 rounded-lg text-sm">
      {$successMessage}
    </div>
  {/if}
  
  <form on:submit|preventDefault={verifyCode} class="space-y-6">
    <div class="flex justify-center space-x-2">
      {#each digits as _, i}
        <input
          id="digit-{i}"
          type="text"
          inputmode="numeric"
          maxlength="1"
          class="w-12 h-12 text-2xl text-gray-400 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
          on:input={(e) => handleDigitInput(e as unknown as InputEvent, i)}
          on:keydown={(e) => handleKeyDown(e, i)}
          bind:value={digits[i]}
          bind:this={inputRefs[i]}
          disabled={$loading}
          aria-label={`Digit ${i + 1} of verification code`}
        />
      {/each}
    </div>
    
    <button
      type="submit"
      class="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={$loading || verificationCode.length !== 6}
    >
      {#if $loading}
        Verifying...
      {:else}
        Verify Email
      {/if}
    </button>
  </form>

  <div class="mt-6 text-center text-sm text-gray-600">
    <p>Code expires after 10 minutes</p>
    <p class="mt-2">
      Didn't receive a code? 
      <button 
        on:click={() => alert('Resend functionality would go here')}
        class="font-medium text-orange-600 hover:underline"
      >
        Resend code
      </button>
    </p>
  </div>
</div>