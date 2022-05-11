import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './layouts/Layout';

import Home from './pages/Home';
import Loader from './pages/Loader';
import Randomizer from './pages/Randomizer';

function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path='/' element={<Home />} />
				<Route path='/loader' element={<Loader />} />
				<Route path='/randomizer' element={<Randomizer />} />
			</Route>
			<Route path='*' element={<Navigate from='*' to='/' />} />
		</Routes>
	);
}

export default App;
