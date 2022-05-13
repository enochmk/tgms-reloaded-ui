import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './views/Home';
import Randomizer from './views/Randomizer';

function App() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='/randomizer' element={<Randomizer />} />
			</Route>
			<Route path='*' element={<Navigate from='*' to='/' />} />
		</Routes>
	);
}

export default App;
