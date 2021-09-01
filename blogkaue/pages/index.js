import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import style from '../styles/layout.module.css';
import { pegarPostsPorData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
// Todos os arquivos js serao como se fosse caminhos url
// Layout importado como home sera o principal e o titles que esta importado no arquivo Layout
export default function Home({dadosDosPosts}) {
  return (
   <Layout home>
     <Head>
       <title>{siteTitle}</title>
     </Head>

     <section>
       <p>Aqui vou falar um pouco sobre os projetos que eu desenvolvi.</p>
     </section>

     <section>
       <h2>Blog</h2>
       <ul>
         {
           dadosDosPosts.map(({id,date,title})=>(
             <li key={id}>
               <Link href={`/posts/${id}`}>
                 {title}
               </Link>
               <small>
                 <Date dateString={date}/>
               </small>
             </li>
           ))
         }
       </ul>
     </section>
   </Layout>
  )
}

export async function getStaticProps(){
  const dadosDosPosts = pegarPostsPorData();
  return{
    props:{
      dadosDosPosts
    }
  }
}
