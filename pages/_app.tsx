import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Layout from '../components/layout'
import { useRouter } from 'next/router'
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return(
    <SessionProvider session={pageProps.session}>
      <Layout {...pageProps}>
        <Component {...pageProps} key={router.asPath}/>
      </Layout>
    
  </SessionProvider>)
}

export default MyApp
