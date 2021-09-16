import Head from "next/head";
import Layout, { siteTitle } from '../components/layout';
import style from '../styles/layout.module.css';
import { pegarPostsPorData } from '../lib/postsProject';
import Link from 'next/link';
import Date from '../Components/date';
// Todos os arquivos js serao como se fosse caminhos url
// Layout importado como home sera o principal e o titles que esta importado no arquivo Layout
export default function Home({dadosDosPosts}) {
  return (
   <Layout>
     <Head>
       <title>{siteTitle}</title>
     </Head>

     <section>
       <p className={style.paragraph}>Aqui esta a lista sobre projetos que desenvolvi. Muitos deles foram feitos graças ao curso da Blue Edtech, há também o que foi desenvolvido como Trabalho de Conclusão de Curso (TCC), mas há outros que planejo desenvolver e destacar aqui futuramente. </p>
     </section>

     <section className={style.blogArea}>
       <h2 className={style.title}>Blog</h2>
       <ul>
         {
           dadosDosPosts.map(({id,date,title})=>(
             <li key={id}  className={style.list}>
               <Link href={`/posts/project/${id}`}>
                 {title}
               </Link>
               <small className={style.data}>
                 <Date dateString={date}/>
               </small>
             </li>
           ))
         }
       </ul>
     </section>
     <section>
       
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
