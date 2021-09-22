import '../styles/globals.css'
import { initializeStore } from '../store'
import { Provider } from 'react-redux'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  const store = initializeStore()
  return <Provider store={store}>
    <Header />

    <main>
      <Component {...pageProps} />
    </main>

    <footer></footer>
  </Provider>
}

export default MyApp
