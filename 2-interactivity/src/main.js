import App from './App.svelte';

const app = new App({
	target: document.body,
	hydrate: true,
	props: {
		recipes: window.__RECIPES__
	}
});

export default app;
