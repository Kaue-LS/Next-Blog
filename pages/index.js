import Head from "next/head";
import Layout, { siteTitle } from '../Components/layout';
import style from '../styles/layout.module.css';
import { pegarPostsPorData } from '../lib/postsAbout';
import Link from 'next/link';
// Todos os arquivos js serao como se fosse caminhos url
// Layout importado como home sera o principal e o titles que esta importado no arquivo Layout
export default function Home({dadosDosPosts}) {
  return (
   <Layout home>
     <Head>
       <title>{siteTitle}</title>
     </Head>

     <section>
       <p className={style.paragraph}>Ola! Bem vindo ao meu blog, aqui você além de obter algumas informações sobre mim, também poderá conhecer alguns projetos que desenvolvi.</p>
     </section>

     <section className={style.blogArea}>
       <h2 className={style.title}>Blog</h2>
       <ul>
         {
           dadosDosPosts.map(({id,date,title})=>(
             <li key={id}  className={style.list}>
               <Link href={`/posts/about/${id}`}>
                 {title}
               </Link>
               <small className={style.data}>
               </small>
             </li>
           ))
         }
       </ul>
       <section>
       <li  className={style.list}>
         <Link href='/projects'>
           Projetos que desenvolvi
         </Link>
         <small className={style.data}>
                 Meus projetos.
               </small>
       </li>
       </section>
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
