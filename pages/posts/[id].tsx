import Head from 'next/head';
import Layout from '../../components/layout/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';

interface PostData {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
}

interface Props {
  postData: PostData;
}

const Post: FC<Props> = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div className={utilStyles.content} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};

export default Post;
