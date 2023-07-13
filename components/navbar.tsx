
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';


export default function Navbar(params: { [x: string]: any; }) {
  const { session, ...others } = params



  //console.log('session:::', others)
  return (
    <>
      <Head>
        <title>WeSales</title>
        <meta name="description" content="Discover a wide range of high-quality products at our e-commerce store. Shop for the latest fashion trends, home decor, electronics, and more. Enjoy convenient shopping with fast shipping and secure payment options. Find great deals and discounts on top brands. Transform your shopping experience with our user-friendly website and exceptional customer service. Start exploring our diverse collection today and elevate your lifestyle with our curated selection of products.." />
        <meta property="og:title" content="My Page" />
        <meta property="og:description" content="Discover a wide range of high-quality products at our e-commerce store. Shop for the latest fashion trends, home decor, electronics, and more. Enjoy convenient shopping with fast shipping and secure payment options. Find great deals and discounts on top brands. Transform your shopping experience with our user-friendly website and exceptional customer service. Start exploring our diverse collection today and elevate your lifestyle with our curated selection of products." />
        <meta property="og:image" content="/images/fv.png" />
        <meta name="description" content="Discover a wide range of high-quality products at our e-commerce store. Shop for the latest fashion trends, home decor, electronics, and more." />
        <meta name="keywords" content="Online shopping, E-commerce, Fashion, Clothing, Apparel, Accessories, Shoes, Electronics, Gadgets, Home decor, Furniture, Beauty products, Health and wellness, Sports and fitness, Jewelry, Watches, Baby products, Toys and games, Books, Gifts and souvenirs, Sustainable products, Organic products, Discounted items, Sale, Best deals, Exclusive offers, Free shipping, Customer reviews, Secure payments, Return policy, cloths, trending" />
        <meta name="author" content="joseph akanbi" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph tags */}
        <meta property="og:title" content="WeSales Store" />
        <meta property="og:description" content="Discover a wide range of high-quality products at our e-commerce store. Shop for the latest fashion trends, home decor, electronics, and more." />
        <meta property="og:image" content="/images/fv.png" />
        <meta property="og:url" content="https://emartsales.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WeSales" />
        <meta name="twitter:description" content="Discover a wide range of high-quality products at our e-commerce store. Shop for the latest fashion trends, home decor, electronics, and more." />
        <meta name="twitter:image" content="/images/fv.png" />

        {/* Additional SEO tags */}
        <meta name="canonical" content="https://emartsales.vercel.app/" />
        {/* <meta name="google-site-verification" content="your-google-site-verification-code" /> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-WXB5Y370JX"></Script>
        <Script>
          {
            `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WXB5Y370JX');`
          }
        </Script>
      </Head>

      <div className='z-50 flex items-center justify-between p-5 absolute top-0 right-0 w-full   header_div bg-[#ffffff00]'>
        <Link href='/' className='brand '>
          <span className='custom-text'>WeSales</span>
        </Link>
      </div>

    </>
  )
}