import fs from 'fs';
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark';
import html from 'remark-html';

// Path vai trabalhar com os diretorios e seus caminhos
// FS= file systems faz operações de entrda e de saida, ajuda a interajir com os arquivos/ ele ajuda a ler a pasta do diretorio
// gray matter coverte conteudo strings para objetos, mapeando em /.. /.. /.. / 
// remark renderiza em estilis Markdown .md
// faz markdown em html

// posts
const caminhoDoDiretorio = path.join(process.cwd(),'posts/projects');
// vai juntar os argumentos dentro e formar um caminho, cwd eh o metodo de retorno do processo
// isso esta na pasta post e usalar para serem o caminho de diretorio
// listar na tela inicial todos os posts que existem

export function pegarPostsPorData(){
    // pegar o nome de todos os arquivos na pasta /posts
  // essa variável fica assim ['post01.md', post02.md', 'post03.md']
  const nomeDosArquivos = fs.readdirSync(caminhoDoDiretorio);
//   ------------------------------------
// retorna [{id: 'post01', data}, {}, {}]
// essa variavel vai ter a funçãp de transformar os arquivos dos posts
  const dadosDosPost= nomeDosArquivos.map(arquivo=>{

  
    // ele vai pegar os arquivos e tirar o md e substituir por nada
    const id = arquivo.replace(/\.md$/,'');

    // cria uma variável com o caminho do post ex: '/posts/post01.md'
    // ele vai juntar o caminho do diretorio para terem diretorios unicos
    const caminhoDeCadaPost = path.join(caminhoDoDiretorio,arquivo)

        // pega o conteúdo de um arquivo
    const conteudoDoArquivo = fs.readFileSync(caminhoDeCadaPost)

    // mapear o conteudo do arquivo
    const formatadorMatter= matter(conteudoDoArquivo)

    return{
        id,...formatadorMatter.data
    }
  })
  return dadosDosPost.sort( (a, b) => {

    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
export function pegarTodosOsIds() {
    const nomeDosArquivos = fs.readdirSync(caminhoDoDiretorio)
    return nomeDosArquivos.map( arquivo => {
      return {
        params: {
          id: arquivo.replace(/\.md$/, '')
        }
      }
    })
  }
  // Pegar o conteúdo de cada post e transformar em HTML
// vai retornar para nós um id, um conteúdo em HTML
export async function pegarDadosDoPost(id) {

    const caminhoDoArquivo = path.join(caminhoDoDiretorio, `${id}.md`)
  
    const conteudoDoArquivo = fs.readFileSync(caminhoDoArquivo, 'utf8')
  
    const formatadorMatter = matter(conteudoDoArquivo)
  
    const conteudoProcessado = await remark()
      .use(html)
      .process(formatadorMatter.content)
  
    const conteudoHtml = conteudoProcessado.toString();
  
    return {
      id,
      conteudoHtml,
      ...formatadorMatter.data
    }
  }