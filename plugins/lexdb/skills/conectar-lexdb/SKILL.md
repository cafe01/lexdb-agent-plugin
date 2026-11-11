---
name: conectar-lexdb
description: Conecte a conta LexDB e confira o acesso ao MCP quando o usuário pedir para começar a usar o LexDB ou resolver uma conexão sem autorização. A instalação do plugin já fornece o endereço do servidor.
---

# Começar com o LexDB

O plugin fornece o servidor MCP remoto `lexdb`. Localize suas ferramentas no ambiente; o prefixo pode variar por plataforma. Não peça ao usuário para criar outro conector se este plugin já estiver instalado.

Chame `catalogo` para conferir acesso. Se o host solicitar autenticação, conduza a entrada e o consentimento pelo fluxo OAuth oferecido por ele. O usuário entra na conta LexDB; a conta gratuita pode ser criada nessa entrada. Não peça senha, link de entrada ou token na conversa, nem copie credenciais para arquivos do plugin.

Se as ferramentas não estiverem disponíveis, diferencie plugin ausente/desativado de conta não autorizada. Oriente a ativação ou nova sessão que o host exigir; não alegue conexão concluída sem uma chamada bem-sucedida. Erro de rede não se resolve criando mais contas ou comprando um plano.

Confira a superfície carregada: as ferramentas são `catalogo`, `buscar` e `ler`. A busca aceita `texto`, `filtros`, `ordem`, `limite` e `cursor`. Se o host anunciar outra assinatura, atualize o plugin/conector e recarregue o host; não adapte chamadas a um contrato antigo.

Com o catálogo recebido, informe que a conexão funciona e ofereça começar pela questão de pesquisa do usuário. Use a skill de pesquisa do plugin, se disponível, para planejar a consulta. Se ele pedir apenas um teste, use uma busca simples no recorte informado pelo catálogo e leia um resultado; deixe claro quando a busca não retornar candidatos. Não invente um resultado para demonstrar o acesso.

As buscas, inclusive páginas por cursor, consomem a franquia da conta. Catálogo e leitura não consomem. Uma conta pode ser usada em mais de um assistente, com consumo compartilhado. Ao atingir a cota, explique o retorno do serviço e apresente o link de planos fornecido; não tente contornar o limite com outra conta ou repetição automática.
