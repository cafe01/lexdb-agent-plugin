---
name: pesquisar-jurisprudencia
description: Pesquise jurisprudência brasileira pelo LexDB para uma questão jurídica, fundamentação ou análise de uma citação, usando catálogo, busca lexical e leitura integral. Use quando as ferramentas MCP do LexDB estiverem disponíveis; a skill não substitui a redação ou a condução do caso pelo usuário.
---

# Pesquisar jurisprudência com o LexDB

Use `catalogo`, `buscar`, `ler`, `pesquisa` e `historico` do servidor LexDB identificado pelo host; o prefixo varia. Não invente ferramentas adicionais.

## Da questão ao recorte

Identifique a questão jurídica, o tribunal relevante, a posição processual e eventual data de corte. Parta do encargo e do material recebido; pergunte somente pelo dado ausente que muda a pesquisa. Envie termos e filtros necessários, sem reproduzir autos ou dados pessoais desnecessários.

Chame `catalogo({})`. Cada elemento de `bases` informa tribunal, base, fonte, tipos, `data_observada` (`de`, `ate`, `significado`), `filtros_juridicos` (`naturezas`, `classes` quando habilitados) e `busca_por_processo`. Use esses valores. Os extremos não certificam cobertura contínua nem disponibilidade histórica; a data pode representar juntada, publicação, assinatura ou julgamento.

## Organizar e retomar um trabalho

Pesquisa é um objeto da conta, independente do chat ou plataforma. Quando for útil organizar o trabalho, crie com `pesquisa({"acao":"criar","titulo":"Título do trabalho"})` e entregue o id/url recebidos ao usuário. Para retomar, use `pesquisa({"acao":"listar"})` ou `pesquisa({"acao":"abrir","id":"UUID"})`.

Leia `historico({"pesquisa":"UUID"})` antes de repetir consultas já feitas. A listagem mostra argumentos, custo e quantidade de resultados; recupere a resposta integral com `historico({"registro":"UUID do registro"})`. Histórico não reexecuta nem cobra. As listas aceitam limite/cursor e devolvem proximo_cursor. `historico({"sem_pesquisa":true})` lista consultas não agrupadas; não combine esse filtro com pesquisa.

Ao buscar dentro desse trabalho, envie seu UUID no campo opcional `pesquisa`, inclusive nas continuações por cursor. Sem esse campo, a execução fica no histórico geral, sem agrupamento automático. Não crie pesquisa artificial para toda pergunta. Todos os links exigem a conta proprietária. Não há seleção, notas ou agente especializado neste contrato.

## Buscar

`buscar({consulta?, filtros?, ordem?, limite?, cursor?, pesquisa?})` aceita:

- `filtros.tribunais`, `bases`, `tipos`, `naturezas`, `classes`: listas de valores do catálogo. Alternativas dentro da dimensão; dimensões diferentes se somam. Não há filtro por papel do trecho.
- `filtros.periodo: {de?, ate?}`: datas inclusivas AAAA-MM-DD pela data de referência da base.
- `filtros.referencia: {processo}`: número CNJ, com ou sem pontuação, nas bases que admitem esse modo; um processo pode ter vários atos.
- Ou `filtros.referencia: {base, id_nativo}`: ato nativo exato. Não combine as duas modalidades. O ID nativo não é o UUID de leitura.
- `consulta`: expressão lexical de até300 caracteres. E implícito exige termos no mesmo bloco; `OR` admite alternativas; aspas exigem ordem/proximidade; parênteses agrupam e hífen exclui. A normalização trata acentos e flexões, sem garantir grafia literal. Exija ao menos um termo positivo pesquisável.
- A consulta é opcional: omita para percorrer filtros, período ou referência por data. Informe ao menos um critério; uma chamada vazia é inválida.
- `ordem`: `relevancia` exige consulta e é seu padrão; sem expressão, o padrão é `data`.
- `limite`: de1 a100, padrão20.

Exemplo de forma, ajustável ao catálogo e à pergunta:

```json
{"consulta":"(usura OR agiotagem) \"ônus da prova\"","filtros":{"tribunais":["TJES"],"naturezas":["cível"]},"limite":10}
```

Para explorar sem expressão: `{"filtros":{"tribunais":["TJES"]},"ordem":"data","limite":10}`.

A resposta contém `itens`, `bases_aplicadas`, `proximo_cursor` e `registro` com id, pesquisa (ou null), url e custo. O id de registro identifica a execução, não um documento. Uma resposta concluída, mesmo vazia, custa1; erros/recusas registrados custam0. O histórico conserva essa resposta; a leitura dos julgados continua sendo a disponível hoje. Confira as bases que participaram: um filtro pode restringir a pesquisa às que o suportam; nenhuma base compatível é erro de entrada, não ausência de precedentes. Catálogo parcial limita conclusões de uma busca vazia.

Para continuar, envie `proximo_cursor` como `cursor` com todos os critérios inalterados, inclusive limite. Nulo encerra a lista. Mudar critérios começa outra busca, sem cursor.

Examine resultados antes de reformular; refine com o vocabulário encontrado e investigue fundamentos contrários. Não execute uma sequência fixa sem ler os retornos. O `trecho`, seu `papel` e a posição no resultado ajudam a selecionar candidatos, sem certificar que o tribunal adotou a passagem. Ela pode ser alegação, precedente citado ou voto vencido.

## Ler e citar

Abra candidatos com `ler({"id":"UUID de itens[].id"})`. Os dados estruturados contêm `estado`, `metadados`, `fonte` quando conhecida e `conteudo` textual quando pronto. O envelope padrão MCP é `structuredContent`; o conteúdo textual da resposta também oferece a leitura renderizada.

`estado: "pronto"` permite ler o conteúdo; `estado: "em_preparacao"` não contém íntegra para leitura. A referência pode estar disponível durante a preparação, mas não atribua fundamentos ao texto não lido. Itens de busca também informam estado e `significado_data`.

Leia fundamentos, fatos e desfecho antes de citar. Distinga fundamento adotado, alegação de parte, transcrição e voto vencido. Explique aplicação e limitações em relação ao caso. Preserve os identificadores recebidos e diferencie link do documento de consulta oficial. Sem endereço específico, apresente os identificadores disponíveis; não invente URL, relator, data ou teor. Encontrar um processo não confirma a exatidão de uma citação.

## Estados da pesquisa e cota

Sem candidatos, reformule ou amplie quando houver razão; relate o recorte, sem concluir inexistência de jurisprudência. Entrada inválida pede correção; indisponibilidade pede informar a falha, sem repetição automática de uma série de chamadas.

Cada busca ou página por cursor conta. `catalogo` e `ler` são livres. Ao esgotar a cota, apresente o link de planos recebido e deixe a decisão com o usuário; não contorne o limite criando contas ou repetindo chamadas.
