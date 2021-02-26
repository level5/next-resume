import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function HomePage() {
  return (
    <div>
      <p>Welcome to Next.js!</p>
      <p>
        <a href="https://beian.miit.gov.cn/">湘ICP备2021002770号</a>
      </p>
    </div>
  );
}

export default HomePage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['resume'])),
    },
  };
}
