# LexDB Agent Plugin

Plugin `lexdb`: conexão ao MCP remoto do LexDB e skills para pesquisar jurisprudência brasileira, ler fundamentos e entregar referências. Claude e ChatGPT/Codex usam o mesmo conteúdo; catálogos e manifestos atendem aos respectivos formatos.

## Prévia 0.2.1

Esta versão usa um servidor descartável com dez documentos de demonstração. O destino real está em [`plugins/lexdb/.mcp.json`](plugins/lexdb/.mcp.json): um túnel HTTPS temporário. O endereço deixa de funcionar quando o túnel parar. Em11/11, o túnel foi parado para continuar o desenvolvimento com o perfil local descrito abaixo; o endereço da prévia não está ativo. Ainda não há domínio ou serviço de produção escolhido. O pacote não demonstra cobertura nacional.

O repositório é público: qualquer pessoa pode obter o pacote e as skills pelo marketplace `cafe01/lexdb-agent-plugin`, sem autorização de acesso ao GitHub e sem assinatura LexDB. A conta gratuita dá direito a 100 buscas por mês quando o serviço estiver disponível. Nesta prévia, o serviço público ainda depende de hospedagem e endereço definitivos; tornar o código público não ativa o MCP desativado acima. Listagem nos diretórios das plataformas é um passo separado.

## O que é instalado

- **`conectar-lexdb`:** autorizar a conta pelo fluxo do host, conferir o catálogo e começar a usar o acervo.
- **`pesquisar-jurisprudencia`:** transformar a questão em consultas, refinar o recorte, ler decisões e fundamentar com as fontes recebidas.
- **MCP `lexdb`:** `catalogo`, `buscar` e `ler`.

Não instala servidor, banco ou mineração no computador do cliente. A conexão usa OAuth; não há chave de API ou credencial no pacote. O plugin não assina um plano pelo usuário.

## Instalar no Claude

No Claude web ou desktop, em **Customize → Plugins → Add → Add marketplace**, escolha adicionar por repositório e informe `cafe01/lexdb-agent-plugin`. Abra o marketplace, instale `lexdb` e autorize a conta LexDB quando solicitado. O acesso ao recurso depende da conta/plataforma; a instalação nesse cliente hospedado ainda precisa ser exercitada.

No Claude Code:

```sh
claude plugin marketplace add cafe01/lexdb-agent-plugin
claude plugin install lexdb@lexdb-agent-plugin
```

Para testar o checkout local, substitua a primeira linha por `claude plugin marketplace add /caminho/lexdb-agent-plugin`. O CLI disponível pode iniciar a autorização com:

```sh
claude mcp login plugin:lexdb:lexdb
```

Esse nome é o gerado pelo Claude Code para o MCP do plugin; não é outro servidor para adicionar. As skills aparecem como `/lexdb:conectar-lexdb` e `/lexdb:pesquisar-jurisprudencia` nos ambientes que usam essa convenção. O uso do modelo depende do acesso à plataforma; instalar e validar o pacote não prova esse acesso.

## Instalar no Codex desktop/CLI

Peça ao agente: “Adicione o marketplace `cafe01/lexdb-agent-plugin`, instale o plugin `lexdb` e confira a conexão com o LexDB.” Ele deve usar o mecanismo de instalação disponível no host. Pelo CLI:

```sh
codex plugin marketplace add cafe01/lexdb-agent-plugin
codex plugin add lexdb@lexdb-agent-plugin
```

Para testar o checkout, use `codex plugin marketplace add /caminho/lexdb-agent-plugin`. Abra uma nova conversa ou sessão após instalar para carregar as skills e ferramentas. Use `conectar-lexdb` para começar; o host pode exigir autorização antes da primeira chamada.

### ChatGPT web

O marketplace local não instala uma integração na nuvem. Enquanto o plugin não tiver um canal hospedado disponível para sua conta, o teste web exige **Plugins → Add custom MCP server**, endereço HTTPS do MCP e OAuth. Não há botão de instalação pública do LexDB nem registro no diretório nesta prévia. Não copie tokens nem senhas para a conversa.

## Primeira pesquisa

Peça, por exemplo: “Pesquise no LexDB sobre [questão], começando pelo [tribunal] e considerando decisões até [data]. Leia os fundamentos dos melhores candidatos e explique por que se aplicam.”

Uma resposta deve se apoiar no que o serviço efetivamente retornou e foi lido. A skill diferencia ausência de candidatos, leitura em preparação, falha de serviço e franquia esgotada. Buscas e páginas por cursor contam na conta; catálogo e leitura não contam.

## Desenvolvimento local sem túnel

O executor local do Codex desktop/CLI e o Claude Code podem acessar um servidor em loopback. O servidor de teste precisa estar rodando; o plugin não o instala. Um agente hospedado na nuvem precisa de um endereço alcançável por ele, mesmo quando a interface é um aplicativo de desktop.

Gere o mesmo pacote com um destino exclusivo de desenvolvimento:

```sh
npm run prepare:local -- http://127.0.0.1:4692/mcp
```

O comando recria `.build/local-marketplace`, conserva as skills e gera manifestos `0.2.1-dev`. Não altera o endereço HTTPS distribuído por Git. Use a origem do servidor igual à origem dessa URL, para os metadados OAuth e cookies corresponderem.

Se o marketplace Git já estiver instalado, remova primeiro **somente** o plugin e o marketplace LexDB, pois o nome é o mesmo. Depois adicione o caminho absoluto impresso pelo gerador e instale novamente:

```sh
codex plugin marketplace add /caminho/lexdb-agent-plugin/.build/local-marketplace
codex plugin add lexdb@lexdb-agent-plugin
claude plugin marketplace add /caminho/lexdb-agent-plugin/.build/local-marketplace
claude plugin install lexdb@lexdb-agent-plugin
```

Abra uma nova conversa no Codex para carregar a instalação. Refaça a autorização ao trocar a origem do serviço. Após mudar skills ou manifestos, regenere o pacote e atualize a instalação pelo mecanismo do host. Não edite a cópia gerada como fonte.

## Manter e verificar o pacote

Não há dependências npm de execução. Com Node instalado:

```sh
npm test
claude plugin validate --strict .
claude plugin validate --strict plugins/lexdb
```

Para mudar o destino da próxima versão, use `npm run configure -- URL_HTTPS_DO_MCP`. O comando exige `/mcp`, rejeita credenciais, query, fragmento, HTTP e loopback. Ele muda somente a declaração compartilhada do MCP; confira o endpoint antes de distribuir a atualização. Um túnel temporário pertence a uma prévia, não a uma versão de produção.

Leia [VALIDATION.md](VALIDATION.md) para distinguir formato, instalação, autorização e chamadas efetivamente demonstradas. A documentação atual do produto e o design do servidor ficam no repositório privado do portfólio, em `LexDB/`.
