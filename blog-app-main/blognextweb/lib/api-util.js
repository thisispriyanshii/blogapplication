export const BLOG_DOMAIN = "http://localhost:8080/api";

export async function getPostData(postIdentifier) {
  const response = await fetch(`${BLOG_DOMAIN}/posts/${postIdentifier}`);
  if (!response.ok) {
    return null;
  }
  const postData = await response.json();
  return postData;
}

export async function getAllPosts(token) {
  const response = token? await fetch(`${BLOG_DOMAIN}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }): await fetch(`${BLOG_DOMAIN}/posts`);
  const allPosts = response.ok? await response.json(): {content: []};
  return allPosts?.content;
}

export async function getFeaturedPosts() {
  const allPosts = await getAllPosts();

  const featuredPosts = allPosts?.slice(0, 10);

  return featuredPosts;
}