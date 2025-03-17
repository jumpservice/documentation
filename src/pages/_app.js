import "tailwindcss/tailwind.css";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useRouter } from "next/router";

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // check current path: "/docs"
  const isDocsPage = router.pathname.startsWith("/docs");

  return (
    <>
      <GoogleAnalytics gaId="G-QJE3MCHN3H"/>
      <div className={isDocsPage ? "docs" : ""}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
