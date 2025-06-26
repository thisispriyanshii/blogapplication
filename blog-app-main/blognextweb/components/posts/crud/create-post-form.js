import { useState, useEffect, useContext } from 'react';

import classes from './contact-form.module.css';
import Notification from '../../ui/notification';
import AuthContext from '../../store/auth-context';

async function createPost({postDetails, jwt, categoryDetails}) {
  const createCategoryResponse = await fetch('/api/categories', {
    method: 'POST',
    body: JSON.stringify(categoryDetails),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
  })
  const categoryData = await createCategoryResponse.json();
  if (!createCategoryResponse.ok) {
    throw new Error(categoryData.message || 'Something went wrong!');
  }
  const response = await fetch('/api/create', {
    method: 'POST',
    body: JSON.stringify({ ...postDetails, categoryId: categoryData?.data?.id }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
  return data;
}

function CreatePostForm() {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredDesc, setEnteredDesc] = useState('');
  const [enteredContent, setEnteredContent] = useState('');
  const [enteredCategory, setEnteredCategory] = useState('');
  const [enteredCategoryDesc, setEnteredCategoryDesc] = useState('');
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function createHandler(event) {
    event.preventDefault();

    // optional: add client-side validation

    setRequestStatus('pending');

    try {
      const response = await createPost({
        postDetails: {
            title: enteredTitle,
            description: enteredDesc,
            content: enteredContent,
        },
        jwt: authCtx.token,
        categoryDetails: {
          name: enteredCategory,
          description: enteredCategoryDesc
        }
      });
      setRequestStatus('success');
      setEnteredTitle('');
      setEnteredDesc('');
      setEnteredContent('');
      setEnteredCategory('');
      setEnteredCategoryDesc('');
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Submiting Post...',
      message: 'Blogging in Few Minutes!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Posted successfully!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>Fill in the details to create post</h1>
      <form className={classes.form} onSubmit={createHandler}>
        <div className={classes.control}>
          <label htmlFor='message'>Post Title</label>
          <textarea
            id='title'
            rows='1'
            required
            value={enteredTitle}
            onChange={(event) => setEnteredTitle(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Post Description</label>
          <textarea
            id='description'
            rows='2'
            required
            value={enteredDesc}
            onChange={(event) => setEnteredDesc(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Post Content</label>
          <textarea
            id='content'
            rows='5'
            required
            value={enteredContent}
            onChange={(event) => setEnteredContent(event.target.value)}
          ></textarea>
        </div> 
        <div className={classes.control}>
          <label htmlFor='message'>Post Category</label>
          <textarea
            id='category-name'
            rows='1'
            required
            value={enteredCategory}
            onChange={(event) => setEnteredCategory(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Category Description</label>
          <textarea
            id='category-desc'
            rows='2'
            required
            value={enteredCategoryDesc}
            onChange={(event) => setEnteredCategoryDesc(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default CreatePostForm;
