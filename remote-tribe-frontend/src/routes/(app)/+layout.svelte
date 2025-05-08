<script lang="ts">
	import Footer from "$lib/shared/Footer.svelte";
    import Header from "$lib/shared/Header.svelte";
</script>

<section>
   <Header />
    <slot></slot>
    <Footer />
</section>