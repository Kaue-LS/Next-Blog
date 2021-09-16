/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import style from "../styles/layout.module.css";
const name = "Kauê Leite";
export const siteTitle = "Kauê Leite/Desenvolvedor Front End";

export default function Layout({ home, children }) {
  return (
    // Sao os como props do css
    <div className={style.container}>
      {/* O head é como se fosse a header */}
      <Head>
        {/* A meta informa como texto que pode ser pesquisado como uma meta descirption, que pode por
                exemplo aparecer no compartilhamento de link no whats ou no face, ela tem a meta imagem, a meta titulo e a description  */}
        <meta name="description" content="Kauê Leite/Desenvolvedor Front End" />
        <meta />
      </Head>
      <header className={style.header}>
        {/* Uma condição se caso nao for a home que esta na tela, o home esta no index atribuito a tag do layout */}
        {home ? (
          <div className={`${style.areaImage}`}>
            <img
              src="/Images/Me.png"
              className={`${style.header} ${style.borderCircle}`}
              alt={name}
            />
            <h1 className={style.heading2XL}>{name}</h1>
          </div>
        ) : (
          <div className={`${style.areaImage}`}>
            <Link href="/">
              <img
                src="/Images/Me.png"
                className={`${style.colorLink} ${style.borderCircle}`}
                alt={name}
              />
            </Link>
            <h2 className={style.headingLg}>
              <Link href="/">{name}</Link>
            </h2>
          </div>
        )}
      </header>
      <main className={style.children}>{children}</main>
      {
        // Condição que ira resultar do retorno se for diferente de home
        !home && (
          <div className={style.backToHome}>
            <Link href="/">Voltar para inicial</Link>
          </div>
        )
      }
    </div>
  );
}
