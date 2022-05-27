import { auth, firestore, googleAuthProvider } from '../lib/firebase';

/* eslint-disable @next/next/no-img-element */

export default function Enter(props) {
    const user = null;
    const username = null;
    // 1. user signed out SHOW <SignInButton />
    // 2. user signed in, but missing username SHOW <UsernameForm />
    // 3. user signed in, has username SHOW <SignOutButton />
    return (
        <main>
            {user ?
                !username ? <UsernameForm /> : <SignOutButton /> 
                : 
                <SignInButton /> 
            }
        </main>
    );
}
// Sign in with google button
function SignInButton() {
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    };
    return (
        <button className='btn-google' onClick={signInWithGoogle}>
            <img src={'/google.png'} /> Sign in with Google
        </button>
    );
}
// Sign out button
function SignOutButton () {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
}
// username form
function UsernameForm() {
    return null;
}