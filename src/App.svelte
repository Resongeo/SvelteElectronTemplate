<main>
	<Topbar />
	<Welcome title="Welcome" message="Svelte + Electron template" />
</main>

<script>
	import Welcome from "./Components/Welcome.svelte";
	import Topbar from "./Components/Topbar.svelte";
</script>

<style>
	main{
		user-select: none;
	}
</style>