import Metatags from '../components/Metatags';
import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';
import { firestore, fromMillis, postToJSON } from '../lib/firebase';
import { useState } from 'react';
import toast from 'react-hot-toast';

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context: any) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);
  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props: { posts: any; }) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc: { data: () => any; }) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <Metatags title="Home Page" description="Get Inside The Bubble" />

      <div className="card card-info">
        <h2> 🫧 Inside The Bubble 🫧</h2>
        <p>Music loving 👨‍🎤 FujiFilm enthusiast 📷 Supporter of local craft beer 🍺</p>
        <p>From the world of property and casualty insurance to becoming a Full Time Web Developer 🧑‍💻</p>
        <p>Follow my path from Zero Experience to Entry Level and everything in between 🎬</p>
      </div>

      <div>
      <button onClick={() => toast.success('Hello World! 🌐')}>
      🥃
        </button>
      </div>

      <PostFeed posts={posts} admin={undefined} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
    </main>
  );
}
