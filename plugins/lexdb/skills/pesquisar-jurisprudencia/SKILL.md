---
name: pesquisar-jurisprudencia
description: Pesquise jurisprudência brasileira pelo LexDB para uma questão jurídica, fundamentação ou análise de uma citação, usando catálogo, busca lexical e leitura integral. Use quando as ferramentas MCP do LexDB estiverem disponíveis; a skill não substitui a redação ou a condução do caso pelo usuário.
---

# Pesquisar jurisprudência com o LexDB

Use as ferramentas deste servidor LexDB, identificadas pelo host; não suponha um prefixo fixo. O contrato atual é `list_jurisprudence_filters`, `search_jurisprudence` e `get_jurisprudence_document`. Não use nomes propostos como `catalogo`, `buscar` ou `ler` como se fossem ferramentas instaladas.

## Da pergunta à pesquisa

Identifique a questão que a jurisprudência precisa resolver, o tribunal relevante, a posição processual e eventual data de corte. Parta do encargo e do material que o usuário trouxe. Se faltar um dado que muda a pesquisa, pergunte; não exija um processo completo para uma pergunta jurídica autônoma. Envie à busca somente termos e filtros necessários, sem reproduzir autos ou dados pessoais desnecessários.

Consulte `list_jurisprudence_filters({})` para conhecer as bases, os períodos observados e os filtros disponíveis. Um catálogo parcial limita o que uma busca vazia permite concluir. Não confunda uma base ausente com inexistência de jurisprudência do tribunal.

Comece por termos que admitam as formulações pertinentes à questão. Refine com o conceito decisivo, matéria e classe quando o catálogo os habilitar. Explore decisões contrárias e fundamentos que mudem o resultado; depois amplie o recorte quando isso servir à pergunta. Não aplique uma sequência fixa de chamadas nem execute uma lista de pesquisas sem examinar os resultados.

## Ferramentas e critérios

`search_jurisprudence` aceita `q`, `tribunal`, `base`, `tipo`, `natureza`, `classe`, `from`, `to`, `processo`, `ref_base`, `ref_id`, `ordem`, `limit` e `cursor`.

- `tribunal`, `base`, `tipo`, `natureza` e `classe` são arrays de strings, com valores do catálogo. Não há filtro `onde` ou filtro público por papel do trecho.
- Datas são inclusivas, em `AAAA-MM-DD`, pela data de referência da fonte. Ela não é necessariamente a data do julgamento.
- `q` combina termos com E no mesmo bloco. `OR` admite alternativas; aspas exigem ordem e proximidade da expressão; parênteses agrupam; hífen exclui termo. A normalização trata português, acentos e flexões, sem garantir identidade literal.
- Exemplo de forma: `{"q":"(usura OR agiotagem) \"ônus da prova\"","tribunal":["TJES"],"limit":10}`. Ajuste o recorte à pergunta; o exemplo não impõe tema ou tribunal.
- `ordem` é `relevancia` ou `data`. `limit` vai de 1 a 100. Use `next_cursor` para continuar com os mesmos critérios; mudar termos, filtros, ordem ou limite inicia outra consulta.
- Para um ato conhecido, combine `ref_base` e `ref_id`. Para um processo, use `processo`; ele pode ter vários atos. Não use um ID nativo no lugar do UUID de leitura.

Uma busca retorna documentos em `items`, as bases aplicadas e `next_cursor`. O trecho ajuda a escolher candidatos. O papel do trecho e a posição no resultado não certificam que o tribunal acolheu a passagem ou que ela é a decisão mais forte para o caso.

## Da leitura à referência

Abra os candidatos úteis com `get_jurisprudence_document({"id":"UUID recebido"})`. A íntegra vem no conteúdo textual da resposta; os metadados e a fonte vêm também nos dados estruturados. Leia os fundamentos relevantes, o contexto e o desfecho antes de apoiar uma afirmação no julgado. Distinga fundamento adotado, alegação de parte, precedente transcrito e voto vencido.

Na entrega, explique por que cada decisão serve à questão e quais fatos ou distinções limitam sua aplicação. Preserve tribunal, processo, data e identificação do ato conforme recebidos. Use os links devolvidos pelo serviço e identifique quando a fonte é uma consulta em vez do documento direto. Se não houver URL específica, apresente os identificadores disponíveis; não fabrique endereço, relator, número ou citação. Para conferir uma citação recebida, compare os dados e a afirmação com a leitura, não apenas com a coincidência do processo.

## Estados que mudam a conclusão

- `pending` significa leitura em preparação: use os metadados e a fonte disponíveis, mas não atribua fundamentos a uma íntegra que não foi lida.
- Sem candidatos, reformule ou amplie o recorte quando houver razão. Relate o que foi pesquisado; não conclua que nenhum precedente existe.
- Entrada inválida pede correção da chamada; indisponibilidade pede relatar a falha. Não repita automaticamente uma série de buscas.
- Cota esgotada impede novas buscas, mas catálogo e leitura continuam disponíveis. Cada busca ou página por cursor conta; não prometa que uma pesquisa inteira custa uma única busca. Use o link de planos retornado pelo serviço e deixe a decisão de assinatura com o usuário.
