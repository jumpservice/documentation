import "tailwindcss/tailwind.css";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";


// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics gaId="G-QJE3MCHN3H"/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
