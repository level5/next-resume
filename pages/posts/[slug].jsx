import { getAllPosts, getPostBySlug, markdownToHtml } from '../../lib/api';

import PostBody from '../../components/post-body';
import PostHeader from '../../components/post-header';
import styles from './slug.module.scss';

export default function ({ post }) {
  return (
    <div className={styles.main}>
      <div className={styles.articleContainer}>
        <PostHeader post={post} />
        <PostBody post={post} />
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'slug',
    'title',
    'tags',
    'date',
    'author',
    'content',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: getAllPosts(['slug']).map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
  };
}
