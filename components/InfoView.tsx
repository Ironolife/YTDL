import { Image, Space, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { VFC } from 'react';
import { useInfoStore } from '../stores/info.store';

dayjs.extend(duration);

const InfoView: VFC = () => {
	const { state } = useInfoStore();
	const isDesktop = useMediaQuery('(min-width: 768px)');

	if (!state) return null;

	const {
		videoDetails: { thumbnails, title, author, lengthSeconds },
	} = state.info;

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: isDesktop ? 'row' : 'column',
				alignItems: isDesktop ? 'center' : 'flex-start',
			}}
		>
			<Image
				width={256}
				height={144}
				src={thumbnails.at(-1)?.url} // Largest thumbnail
				alt='thumbnail'
				radius='sm'
			/>
			<Space h='md' w='md' />
			<div>
				<Text>{title}</Text>
				<Text color='dimmed'>{author.name}</Text>
				<Text>
					{dayjs.duration(parseInt(lengthSeconds, 10), 's').format('HH:mm:ss')}
				</Text>
			</div>
		</div>
	);
};

export default InfoView;
