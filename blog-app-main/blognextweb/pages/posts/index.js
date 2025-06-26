import Head from 'next/head';
import { Fragment } from 'react';

import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/api-util';
import Link from 'next/link';

function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts!'
        />
      </Head>
      <div>
        <Link href='/posts/create'>Create Post</Link>
      </div>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
}

export async function getServerSideProps({req, res}) {
  const allPosts = await getAllPosts(req?.header?.Authorization);

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;
