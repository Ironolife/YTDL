import { MantineProvider } from '@mantine/core';
import React, { FC, PropsWithChildren } from 'react';

const _MantineProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<MantineProvider
			withNormalizeCSS
			theme={{
				fontFamily: 'Quicksand, sans-serif',
				headings: {
					fontFamily: 'Quicksand, sans-serif',
					fontWeight: 'normal',
				},
			}}
		>
			{children}
		</MantineProvider>
	);
};

export default _MantineProvider;
