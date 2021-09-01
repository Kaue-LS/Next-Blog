import Layout from "../../components/layout";
import { pegarTodosOsIds, pegarDadosDoPost } from "../../lib/posts";
import Head from "next/head";
import Date from '../../components/date';
import posts from '../../styles/posts.module.css';


export default function Post({ dadosDosPosts }) {
  return(
    <Layout>

      {/* Título da página que é o nome do nosso post */}
      <Head>{dadosDosPosts.title}</Head>

      <article>
        {/* Nome do post */}
        <h1>{dadosDosPosts.title}</h1>

        {/* Data do post */}
        <div>
          <Date dateString={dadosDosPosts.date} />
        </div>

        {/* Conteúdo do post em html */}
        <div dangerouslySetInnerHTML={{ __html: dadosDosPosts.conteudoHtml }} />

      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = pegarTodosOsIds();
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const dadosDosPosts = await pegarDadosDoPost(params.id)
  return {
    props: {
      dadosDosPosts
    }
  }
}