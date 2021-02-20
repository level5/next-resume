import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import highlight from 'remark-highlight.js';

const postsDir = join(process.cwd(), '_posts');

const githubDir = join(process.cwd(), '..', '..', 'github');

const slugs = {
  'git-configuration': join(githubDir, 'convergent/git/git-configuration.md'),
  'git-basic-commands': join(githubDir, 'convergent/git/git-basic-commands.md'),
};

export function getPostSlugs() {
  return fs.readdirSync(postsDir);
  // return Object.keys(slugs);
}

export function getPostBySlug(slug, fields: string[] = []) {
  // change from xxx.md to xxx
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDir, `${realSlug}.md`);
  // const fullPath = slugs[slug];

  const fileContent = fs.readFileSync(fullPath);
  const { data, content } = matter(fileContent);

  const item: { slug?: string; content?: string; [name: string]: any } = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      item.slug = realSlug;
    } else if (field === 'content') {
      item.content = content;
    } else if (data[field]) {
      item[field] = data[field];
    }
  });
  return item;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).use(highlight).process(markdown);
  return result.toString();
}
