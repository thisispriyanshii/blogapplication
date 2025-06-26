import React, { Fragment } from "react";
import CreatePostForm from "../../components/posts/crud/create-post-form";
import Head from "next/head";

function CreatePostPage() {
  return (
    <Fragment>
      <Head>
        <title>Create Post</title>
        <meta name='description' content='Create your new post!' />
      </Head>
      <CreatePostForm />
    </Fragment>
  );
};

export default CreatePostPage;
