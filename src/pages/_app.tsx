// pages/_app.tsx

import React from 'react';
import { AppProps } from 'next/app';
import Link from 'next/link';
import '../styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      {/* Navigation links */}
      <nav>
        <ul>
          <li>
            <Link href="/portfolio">
              <p>Portfolio</p>
            </Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>

      {/* Main content */}
      <main>
        <Component {...pageProps} />
      </main>

      {/* Video section */}
      <section>
        <h2>Featured Video</h2>
        <video controls>
          <source src="/path_to_your_video/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Footer */}
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default MyApp;
