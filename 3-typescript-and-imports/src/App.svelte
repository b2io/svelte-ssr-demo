<script>
	export let recipes = null;

	let showIngredients = false

	!recipes && fetch("http://localhost:8080/api/")
		.then((response) => response.json())
		.then((json) => (recipes = json.results));
</script>

<main>
	{#if recipes === null}
		<div>Loading...</div>
	{:else}
		<label>
			<input type=checkbox bind:checked={showIngredients}/>
			Show Ingredients
		</label>
		<ul>
			{#each recipes as recipe} 
				<a href={recipe.href}>
					<img src='{recipe.thumbnail}' alt='Thumbnail for {recipe.title}' />
					<div class='wrapper'>
						<div>{recipe.title}</div>
						{#if showIngredients}<div class='ingredients'>{recipe.ingredients}</div>{/if}
					</div>
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
		height: 80px;
		width: 80px;
		border-radius: 5px;
	}

	a:hover {
		background: lightblue;
	}

	.wrapper {
		padding-left: 8px;
		text-align: start;
	}

	.ingredients {
		font-size: .7rem;
	}
</style>
