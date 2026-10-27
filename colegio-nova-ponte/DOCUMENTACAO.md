# Documentação do projeto: Colégio Nova Ponte

## 1. Visão geral

Homepage institucional de uma escola particular fictícia, desenvolvida como teste técnico para Desenvolvedora Web Júnior. O objetivo é apresentar a escola às famílias, destacar as matrículas e levar o visitante a entrar em contato ou agendar uma visita.

## 2. Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica e acessível |
| CSS3 | Estilos, grid, flexbox, variáveis e responsividade |
| JavaScript (puro) | Carrossel, menu mobile, validação do formulário e animações |
| Google Fonts | Sora (títulos) e Inter (texto) |
| SVG | Logo, ícones das redes, bandeiras e ilustrações |

Não usa React, Vue, Angular ou qualquer outro framework.

## 3. Estrutura de arquivos

Todos os arquivos ficam na mesma pasta, sem subpastas, para o envio ao GitHub não depender de pastas: `index.html`, `style.css`, `script.js`, as fotos (`foto-*.jpg`), as ilustrações (`slide-*.svg`), as bandeiras (`flag-*.svg`) e as logos (`logo-icon.svg`, `favicon.svg`, `logo-horizontal.svg`, `logo-horizontal-branco.svg`).

Todos os caminhos são relativos, em minúsculas e sem acentos ou espaços, para funcionar no GitHub Pages (que diferencia maiúsculas de minúsculas).

## 4. Identidade visual

**Conceito:** o nome "Nova Ponte" inspira a marca. A ponte liga o aluno ao futuro e a família à escola. O arco da logo se repete nas molduras das fotos.

**Logo** (a pasta do projeto):
- `logo-icon.svg`: ícone quadrado, usado no cabeçalho e no rodapé
- `favicon.svg`: ícone da aba do navegador
- `logo-horizontal.svg`: ícone com o nome, para fundos claros
- `logo-horizontal-branco.svg`: ícone com o nome, para fundos escuros

**Paleta:** duas cores principais, mais tons escuros e claros do turquesa.

| Cor | Código | Uso |
|---|---|---|
| Turquesa | `#17B8A6` | Cor principal, destaques e logo |
| Amarelo | `#FFB400` | CTAs e detalhes |
| Verde-petróleo | `#062B29` | Fundos escuros e textos |
| Turquesa escuro | `#0E7C70` | Textos de destaque |
| Turquesa claro | `#F1FBF9` | Fundos de seções |

**Tipografia:** Sora nos títulos (moderna e geométrica) e Inter no texto (alta legibilidade).

## 5. Seções da página

1. **Barra superior:** telefone, redes sociais e bandeiras dos idiomas
2. **Menu:** Home, O Colégio, Segmentos de Ensino, Ensino Médio, Diferenciais, Atividades Extracurriculares e Contato
3. **Carrossel:** 4 slides, com CTAs "Conheça nossa escola", "Agende uma visita" e "Faça sua matrícula"
4. **Faixa de matrículas:** destaque fixo logo abaixo do carrossel
5. **O Colégio:** apresentação e números
6. **Segmentos de Ensino:** Educação Infantil, Ensino Fundamental e Ensino Médio, cada um com descrição e botão
7. **Ensino Médio:** preparação para o futuro, pensamento crítico, ENEM e vestibulares, projetos práticos
8. **Diferenciais:** acolhimento, ambiente seguro e desenvolvimento socioemocional
9. **Atividades Extracurriculares:** esportes, cultura, artes e projetos
10. **Contato:** formulário e canais de atendimento
11. **Rodapé:** logo, apresentação, endereço, telefone, e-mail, navegação, redes e horário

## 6. Responsividade

| Tela | Largura | Principais ajustes |
|---|---|---|
| Mobile | até 639px | Uma coluna, botões na largura toda, menu hambúrguer |
| Tablet | 640px a 1023px | Cards em 2 colunas, rodapé em 2 colunas, menu hambúrguer |
| Desktop | 1024px ou mais | Layout completo em 3 e 4 colunas |

O menu completo só aparece acima de 1240px de largura, porque os 7 links não cabem em uma linha em telas menores. O carrossel ajusta a altura ao texto de cada slide, para nada ser cortado.

## 7. JavaScript (`script.js`)

- **Menu mobile:** abre e fecha, e fecha com a tecla Esc ou ao clicar em um link
- **Link ativo:** destaca no menu a seção que está na tela (`IntersectionObserver`)
- **Carrossel:** troca automática a cada 6 segundos, setas, bolinhas, deslizar no celular, teclado e botão de pausa. Respeita a preferência de "reduzir movimento" do sistema
- **Formulário:** máscara de telefone, validação de nome completo, e-mail, telefone com DDD, segmento e mensagem, com erros por campo e mensagem de confirmação. Nenhum dado é enviado a servidor, pois é demonstrativo
- **Segmentos:** os botões "Quero conhecer" já preenchem o segmento no formulário
- **Efeitos:** barra de progresso de leitura, blocos que aparecem ao rolar e contadores animados

## 8. Acessibilidade

- HTML semântico (`header`, `nav`, `main`, `section`, `footer`)
- Link "Ir para o conteúdo" para navegação por teclado
- Textos alternativos nas imagens e rótulos nos ícones
- Foco visível, formulário com `label` e mensagens de erro anunciadas
- Contraste adequado entre texto e fundo

## 9. Como publicar

**GitHub Pages:** envie os arquivos para um repositório público, abra Settings > Pages, escolha a branch `main` e a pasta `/ (root)` e clique em Save. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO`.

**Alternativa:** arraste a pasta do projeto em app.netlify.com/drop para gerar um link na hora.

## 10. Personalização

- **Cores:** variáveis no início de `style.css` (`--green` turquesa, `--sun` amarelo)
- **Contatos e redes:** procure por `wa.me`, `instagram.com`, `facebook.com` e `youtube.com` no `index.html`
- **Fotos:** troque os arquivos em a pasta do projeto mantendo os mesmos nomes
- **Textos:** edite diretamente no `index.html`

## 11. Créditos e observações

- O Colégio Nova Ponte, a logo, os textos e os contatos são fictícios, criados para este teste
- As fotos são de banco de imagens: confirme a licença e a atribuição antes de uso comercial
- Bandeiras, ícones e ilustrações foram desenhados em SVG para este projeto
