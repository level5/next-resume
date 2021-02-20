import styles from './post-header.module.scss';
export default function ({ post }) {
  return (
    <div>
      <ul className={styles.tags}>
        {(post.tags || []).map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.author}>{new Date(post.date).toDateString()}</div>
    </div>
  );
}
