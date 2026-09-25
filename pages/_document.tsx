import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en' className='scroll-smooth'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap'
            rel='stylesheet'
          />
          <link
            rel='apple-touch-icon'
            sizes='76x76'
            href='/static/favicons/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/static/favicons/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/static/favicons/favicon-16x16.png'
          />
          <link rel='manifest' href='/static/favicons/site.webmanifest' />
          <meta name='msapplication-TileColor' content='#0a0a0f' />
          <meta name='theme-color' content='#0a0a0f' />
          <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
        </Head>
        <body className='bg-term-bg font-sans text-term-text antialiased'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
