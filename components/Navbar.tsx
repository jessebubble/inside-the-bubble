import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */

export default function Navbar () {
    const user = true;
    const username = true;

    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link href="/">
                        <button className='btn-logo'>FEED</button>
                    </Link>
                </li>
                {/* user is signed in and has username */}
                {username && (
                    <>
                        <li className='push-left'>
                            <Link href="/admin">
                                <button className='btn-blue'>Write Posts</button>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/${username}`}>
                                <img src={user?.photoURL} alt="user picture"/>
                            </Link>
                        </li>
                    </>
                )}
                {/* user not signed in - user has no created username */}
                {!username && (
                    <li>
                        <Link href="/enter">
                            <button className='btn-blue'>Log in</button>
                        </Link>
                    </li>

                )}
            </ul>

        </nav>
    );
}