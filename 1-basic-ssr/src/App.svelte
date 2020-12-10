<script>
	export let recipes = null;

	!recipes && fetch("http://localhost:8080/api/")
		.then((response) => response.json())
		.then((json) => (recipes = json.results));
</script>

<main>
	{#if recipes === null}
		<div>Loading...</div>
	{:else}
	<ul>
		{#each recipes as recipe} 
			<a href={recipe.href}>
				<img src='{recipe.thumbnail}' alt='Thumbnail for {recipe.title}' />
				<div class='label'>{recipe.title}</div>
			</a>
		{/each}
		</ul>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	a {
		height: 96px;
		max-width: 500px;
		border-radius: 5px;
		margin: 8px auto;
		display: flex;
		align-items: center;
	}

	img {
		margin-left: 8px;
		height: 80px;
		width: 80px;
		border-radius: 5px;
	}

	a:hover {
		background: lightblue;
	}

	.label {
		margin-left: 16px;
	}
</style>
