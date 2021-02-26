import styles from './index.module.scss';
import { getAllPosts } from '../../lib/api';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export default function ({ posts }) {
  return (
    <div className={styles.main}>
      <div className={styles.title}>Level-5</div>
      <div className="filterBar"></div>
      <div className={styles.articlesContainer}>
        {posts.map((post) => (
          <article className={styles.article} key={post.slug}>
            <ul className={styles.articleTag}>
              {(post.tags || []).map((tag) => {
                return <li key={tag}>{tag}</li>;
              })}
            </ul>
            <div className={styles.articleTitle}>
              <a href={`posts/${post.slug}`} target="_blank">
                {post.title}
              </a>
            </div>
            <div className={styles.articleContent}>{post.desc}</div>
            <div className={styles.articleAuthor}>
              {new Date(post.date).toDateString()}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps({ params, locale }) {
  const posts = getAllPosts(['slug', 'title', 'tags', 'date', 'author']);

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['resume'])),
    },
  };
}
