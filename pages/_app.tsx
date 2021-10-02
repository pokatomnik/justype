import Head from 'next/head';
import { Downloader, makeBroadcastProvider } from '../features';
import '../styles/globals.css';

interface IMyAppProps<CP extends object> {
  Component: React.ComponentType<CP>;
  pageProps: CP;
}

const BroadcastProvider = makeBroadcastProvider('justype_text');

export default function MyApp<CP extends object>({
  Component,
  pageProps,
}: IMyAppProps<CP>) {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/fonts/fanta.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Justype</title>

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#664aff" />
      </Head>
      <BroadcastProvider>
        <Downloader.DownloadProvider>
          <Component {...pageProps} />
        </Downloader.DownloadProvider>
      </BroadcastProvider>
    </>
  );
}
