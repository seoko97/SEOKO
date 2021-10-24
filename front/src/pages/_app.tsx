import { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';

const theme = {
	BP: {
		BACKGROUND: '1200px',
	},
};

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
};
export default MyApp;
