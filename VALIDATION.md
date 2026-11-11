# Validação da prévia 0.1.0

11/11/2026, Mac. Produto/desenho: `LexDB/specs/028-agent-plugin` no portfólio privado.

## Demonstrado

- `npm test`: três testes passaram, cobrindo recusa de destino inseguro e reconfiguração sem alteração em entrada inválida.
- Claude Code 2.1.246: `claude plugin validate --strict .` e `claude plugin validate --strict plugins/lexdb` passaram. Marketplace local adicionado e `lexdb@lexdb-agent-plugin` instalado no escopo do usuário. `claude plugin details` descobriu as duas skills e o MCP `lexdb`, sem hooks ou agentes auxiliares.
- Codex CLI 0.162.1: marketplace local adicionado e `codex plugin add lexdb@lexdb-agent-plugin --json` instalou e habilitou a versão0.1.0. `plugin/read` do app-server reconheceu ambas as skills habilitadas, ícone e MCP `lexdb`. Isso demonstra resolução do pacote; não demonstra execução das ferramentas pelo modelo.
- Distribuição Git: após o primeiro push (`71ff722`), as instalações locais e seus marketplaces foram removidos nos dois CLIs. Ambos clonaram `git@github.com:cafe01/lexdb-agent-plugin.git`, validaram o catálogo e instalaram `lexdb@lexdb-agent-plugin` novamente. Codex informou fonte Git e instalação no cache; o Claude descobriu novamente as duas skills e o MCP. A clonagem usou o acesso SSH do proprietário ao repositório privado, não acesso anônimo de cliente.
- Ambas as skills passaram no `quick_validate.py` do skill-creator. Instruções revistas contra as assinaturas reais e exemplos de consulta, leitura pendente e cota; o validador de frontmatter não avalia qualidade de pesquisa jurídica.
- Bancada isolada Compose `lexdb028`, Node24/PostgreSQL17, com dez documentos de demonstração. Quick Tunnel Cloudflare2026.10.7 expôs a porta4692 por HTTPS. Readiness e metadados OAuth responderam200 na origem pública; o catálogo de autorização usa a mesma origem do pacote.
- `claude mcp login --no-browser plugin:lexdb:lexdb` iniciou OAuth usando o MCP do plugin instalado. Entrada por link entregue ao Mailpit8625, consentimento pelo HTTPS e callback do Claude concluídos. Navegador mostrou “Authentication successful”; CLI confirmou autenticação. `claude mcp get plugin:lexdb:lexdb` mostrou `Connected` e o endereço HTTPS do pacote, sem configuração manual de outro MCP.
- Cliente SDK MCP independente leu o mesmo endpoint declarado, registrou cliente, recebeu consentimento e executou catálogo, uma busca por `trabalho` e leitura. Quatro bases na fixture; documento `0007c055-d9bf-554f-a527-d05741966813`, TRT17 `pje1_49122208`, 27.579 caracteres retornados. Essa prova é do serviço HTTPS, não de uma pesquisa conduzida pelo modelo Claude ou ChatGPT.

## Ainda não demonstrado

- Chamada MCP pelo pacote dentro de uma conversa Codex, ChatGPT web/desktop ou Claude web/desktop. Claude Code está sem acesso ao modelo na conta disponível; não foi contratada assinatura para a prova. O navegador ChatGPT estava sem login.
- Uma pesquisa jurídica real conduzida pelas skills nos dois produtos, publicação em diretório, domínio/hospedagem de produção ou cobertura nacional.

O túnel teve uma desconexão transitória que produziu502; reconectou e a repetição do OAuth funcionou. Um Quick Tunnel não constitui disponibilidade de produção. Logs, configuração privada e capturas ficam fora deste repositório em `.build/lexdb028/` do portfólio. A instância não contém autos privados nem acessa o banco de mineração.

## Perfil local de desenvolvimento (030)

Em 11/11, o gerador preservou o endpoint distribuído e gerou o marketplace em loopback com versão0.1.0-dev. Os CLIs Claude e Codex foram reinstalados a partir desse artefato. `plugin/read` do app-server Codex reconheceu a instalação habilitada, duas skills e MCP. Claude Code concluiu OAuth inteiramente em HTTP loopback e `claude mcp get plugin:lexdb:lexdb` informou Connected em `http://127.0.0.1:4692/mcp`. A configuração instalada no Codex é compartilhada com o desktop; isso não prova que uma conversa já aberta recarregou ferramentas.

O teste do gerador também confirma remoção de artefatos obsoletos e rejeição de destino remoto/credenciais/query. Esse perfil não exige túnel; a prova HTTPS anterior permanece evidência separada.

Após a prova local, o Quick Tunnel foi parado. O endereço HTTPS da prévia0.1.0 não está mais ativo; a instalação de desenvolvimento neste Mac usa o marketplace local gerado.

## Acesso público ao pacote

Em11/11/2026, por orientação explícita de Café, o repositório passou a público. O conteúdo e o histórico versionados foram revisados antes da mudança: pacote, skills e documentação, sem credenciais ou dados privados de usuários. GitHub confirmou PUBLIC; a consulta HTTPS de HEAD sem configuração global ou helper de credenciais funcionou. Isso permite obter o pacote sem acesso privado, mas não demonstra disponibilidade do MCP, que permanece sem endereço de produção.

## Alinhamento da pesquisa — 0.1.1

As skills passaram a detalhar catálogo por base, significado das datas observadas, bases aplicadas, exploração sem texto, defaults de ordem/limite, exclusão mútua das referências e término da paginação. A conexão reconhece o schema antigo (offset/filtros escalares) como desatualizado. Ambas passaram no quick_validate.py; três testes do pacote e validação estrita do marketplace passaram.

A versão local0.1.1-dev foi regenerada e instalada nos CLIs Claude e Codex com destino4492, acervo TJES de desenvolvimento. O app-server reconheceu duas skills habilitadas e MCP. Em sessão efêmera de verificação, o runtime Codex autenticado executou catálogo, busca sem texto, texto/refinamento, referência exata, segunda página sem duplicação e leitura ready com fonte (14.465 caracteres). Isso verifica chamadas do runtime, sem alegar avaliação de uma pesquisa jurídica conduzida pelo modelo. A conversa previamente aberta conserva ferramentas em memória até recarga do host.

## Contrato em português — 0.2.0

Por direção de Café em11/11/2026, o MCP passa a catalogo/buscar/ler, com texto/filtros/ordem/limite/cursor e respostas itens/proximo_cursor/estado/metadados/fonte/conteudo. As duas skills e o README foram alinhados sem aliases. Três testes do pacote, validadores das skills e marketplace estrito passaram. A versão local0.2.0-dev foi instalada no Codex e Claude Code; o app-server confirmou as skills habilitadas.

Runtime Codex em sessão efêmera autenticada na4492 reconheceu somente as três ferramentas novas e executou catálogo, busca com/sem texto, cursor, referência e leitura pronta com14.183 caracteres. A prova não é avaliação de pesquisa jurídica pelo modelo. A conversa já aberta exige recarga do aplicativo. O perfil local funciona; a publicação deste código não ativa um serviço MCP público de produção.

## Nome da expressão — 0.2.1

O parâmetro lexical é consulta, substituindo texto por direção de Café em11/11. Ambas as skills foram alinhadas. Três testes, validação da skill de pesquisa e marketplace passaram; versão0.2.1-dev reinstalada no Codex e Claude Code sem reiniciar o aplicativo. O runtime Codex separado verificou consulta no schema e executou busca, cursor, referência e leitura na4492.
