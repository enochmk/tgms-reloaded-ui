import React, { useState } from 'react';

import Upload from '../components/Modals/Upload';
import Header from '../components/Headers/Header';

function Home() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Header />
		</>
	);
}

export default Home;
