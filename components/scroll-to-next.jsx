import styles from './scroll-to-next.module.scss';

export default function ({ scrollToNext }) {
  return (
    <div className={styles.scrollFlag} onClick={scrollToNext}>
      <span>&larr;</span>
      <span>scroll down</span>
    </div>
  );
}
