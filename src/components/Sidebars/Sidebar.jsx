import SidebarItem from './SidebarItem';

function Sidebar() {
	return (
		<aside className='sidenav navbar navbar-vertical navbar-expand-xs bg-gradient-dark bg-transparent fixed-start'>
			<section className='sidenav-header d-flex justify-content-center align-items-center py-4'>
				<span className='ms-1 font-weight-bold text-white'>
					Tugomesu Reloaded 2
				</span>
			</section>
			<hr className='horizontal light mt-0 mb-2' />
			<section className='w-auto max-height-vh-100'>
				<ul className='navbar-nav'>
					<SidebarItem title='Home' link='/' icon='dashboard' />
					<SidebarItem title='Loader' link='/loader' icon='receipt_long' />
					<SidebarItem
						title='Randomizer'
						link='/randomizer'
						icon='table_view'
					/>
				</ul>
			</section>
		</aside>
	);
}

export default Sidebar;
