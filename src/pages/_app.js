import 'tailwindcss/tailwind.css'
import "@/styles/globals.css" 

// This default export is required in a new `pages/_app.js` file.
function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default App