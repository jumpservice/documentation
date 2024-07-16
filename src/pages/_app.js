import "tailwindcss/tailwind.css";
import "@/styles/globals.css";
import GoogleAnalytics from "./google-analytics";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
