const BLOG_DOMAIN = "http://localhost:8080/api";
async function handler(req, res) {
  const { username, password, name, email } = req.body;
  if (
    !email ||
    !email.includes('@') ||
    email.length<3 ||
    !name ||
    name.trim() === '' ||
    !username ||
    username.trim() === '' ||
    !password ||
    password.trim() === ''
  ) {
    res.status(422).json({ message: 'Invalid input.' });
    return;
  }

  const response = await fetch(`${BLOG_DOMAIN}/auth/signup`, {
    method: req.method,
    body: JSON.stringify(req.body),
    headers: req.headers
  });

  if (!response.ok) {
    const data = await response.json();
    res.status(500).json({ message: data?.message });
    return;
  }
  res
    .status(201)
    .json({ message: 'Registered Successfull!' });
}

export default handler;
