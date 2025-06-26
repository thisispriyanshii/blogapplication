import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/getting-started-nextjs.png'
          alt='An image showing nextjs'
          width={300}
          height={300}
        />
      </div>
      <h1>Fontend Blog</h1>
      <p>
        Use this to blog about web development - especially frontend frameworks like
        Angular or React.
      </p>
    </section>
  );
}

export default Hero;
