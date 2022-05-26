/* import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css' */
import Link from 'next/link';
import toast from 'react-hot-toast';

import Loader from '../components/Loader';

export default function Home() {
  return (
    <div>
      <Link prefetch={false} href={{
        pathname: '/[username]',
        query: { username: 'jessebubble' },
      }}>
        <a>Inside The Bubble</a>
      </Link>

      <Loader show />

      <button onClick={() => toast.success('hello world!')}>
        Toast Me
      </button>
    </div>
  )
}
