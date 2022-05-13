import Home from './views/Home';
// import Tables from './views/Tables';

const routes = [
	{
		path: '/',
		name: 'Home',
		icon: 'ni ni-tv-2 text-primary',
		component: Home,
	},
	{
		path: '/randomizer',
		name: 'Randomizer',
		icon: 'ni ni-bullet-list-67 text-red',
		component: Home,
	},
];

export default routes;
