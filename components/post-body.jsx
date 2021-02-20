import { useEffect } from 'react';

import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/core';
import styles from './post-body.module.scss';

export default function ({ post }) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <div
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: post.content }}
    ></div>
  );
}
