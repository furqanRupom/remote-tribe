<script lang="ts">
	import { userProfile } from "$lib/stores/userProfile";
    $:user = $userProfile
</script>
<section class="bg-slate-900 text-gray-400 font-semibold min-h-screen">
    Hello <span class="text-orange-500">{user?.name}</span>

</section>