import Head from 'next/head';
import { Fragment } from 'react';

import PostContent from '../../components/posts/post-detail/post-content';
import { getAllPosts, getPostData } from '../../lib/api-util';

function PostDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.description} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = await getPostData(slug);

  return {
    props: {
      post: postData,
    }
  };
}

/*export function getStaticPaths() {
  const postFilenames = getAllPosts();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}*/


export default PostDetailPage;
