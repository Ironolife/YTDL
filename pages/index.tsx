import {
	Anchor,
	Container,
	Divider,
	Footer,
	Group,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import type { NextPage } from 'next';
import FormatsTable from '../components/FormatsTable';
import InfoView from '../components/InfoView';
import Searchbar from '../components/Searchbar';

const Home: NextPage = () => {
	return (
		<Container size='sm' p='md'>
			<Stack spacing={32}>
				<Title>Youtube Downloader</Title>
				<Searchbar />
				<InfoView />
				<FormatsTable />
				<Divider variant='dashed' />
				<Group sx={{ justifyContent: 'space-between' }}>
					<Anchor
						href='https://github.com/Ironolife'
						target='_blank'
						color='dark'
					>
						Made By Ironolife © 2022
					</Anchor>
					<Text>Updated 2022-04-11</Text>
				</Group>
			</Stack>
		</Container>
	);
};

export default Home;
