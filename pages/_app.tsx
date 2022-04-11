import type { AppProps } from 'next/app';
import Head from 'next/head';
import MantineProvider from '../providers/MantineProvider';
import QueryClientProvider from '../providers/QueryClientProvider';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>YTDL</title>
				<meta name='description' content='Youtube Downloader' />
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<QueryClientProvider>
				<MantineProvider>
					<Component {...pageProps} />
				</MantineProvider>
			</QueryClientProvider>
		</>
	);
}

export default MyApp;
