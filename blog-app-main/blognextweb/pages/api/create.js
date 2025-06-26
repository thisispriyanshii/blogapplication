const BLOG_DOMAIN = "http://localhost:8080/api";
async function handler(req, res) {
  const { title, description, content } = req.body;
  if (
    !title ||
    title.trim() === '' ||
    !description ||
    description.trim() === '' ||
    !content ||
    content.trim() === ''
  ) {
    res.status(422).json({ message: 'Invalid input.' });
    return;
  }

  const response = await fetch(`${BLOG_DOMAIN}/posts`, {
    method: req.method,
    body: JSON.stringify(req.body),
    headers: req.headers
  });

  const data = await response.json();

  if (!response.ok) {
    res.status(500).json({ message: data.message });
    return;
  }
  res
    .status(201)
    .json({ message: 'Post Creation Successfull!' });
}

export default handler;
