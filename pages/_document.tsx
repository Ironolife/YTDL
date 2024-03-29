import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

const getInitialProps = createGetInitialProps();

class MyDocument extends Document {
	static getInitialProps = getInitialProps;

	render() {
		return (
			<Html lang='en'>
				<Head>
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link
						href='https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
