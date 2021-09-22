import Head from 'next/head'
import Calculator from '../components/Calculator/Calculator'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bill Calculator</title>
        <meta name="description" content="Tool for calculating restaurant bill split" />
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="pageContainer">

        <h1 className="darkCyanText">
          SPLI
          <br />
          TTER
        </h1>

        <Calculator />
            
      </main>

    </div>
  )
}
