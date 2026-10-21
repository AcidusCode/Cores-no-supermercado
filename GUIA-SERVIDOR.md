# Servidor próprio e administração

A interface continua em HTML, CSS e JavaScript. O servidor adicional usa apenas módulos incluídos no Node.js 22.13+ (recomendado: Node 24 LTS), incluindo SQLite. Não requer npm install.

## Iniciar

Na pasta do projeto, definir uma palavra-passe de administração com pelo menos 12 caracteres através da configuração de variáveis do servidor. Em terminal local:

```sh
read -s ADMIN_PASSWORD
export ADMIN_PASSWORD
node server.mjs
```

Abre http://127.0.0.1:3000 e http://127.0.0.1:3000/admin.html. Não guardes a palavra-passe no código. O formulário usa sessão HttpOnly com expiração de oito horas, autorização no servidor e limitação de tentativas. A mesma palavra-passe é partilhada pela equipa; não há gestão de utilizadores.

Variáveis: PORT (3000), HOST (127.0.0.1), DATA_FILE (data/respostas.db) e COOKIE_SECURE (true em produção HTTPS). Publicar através de um proxy HTTPS, encaminhando para o Node na interface local. Não ativar COOKIE_SECURE num teste HTTP local.

O alojamento precisa de processo Node permanente e disco persistente. A base fica fora de dist/. Preservar data/ entre atualizações e manter cópias de segurança coerentes com SQLite (a base em modo WAL pode ter dados recentes nos ficheiros -wal; usar a API de backup do SQLite ou parar o processo antes de copiar). Não partilhar o ficheiro da base ou a palavra-passe com participantes.

## Guardado e painel

O questionário deteta automaticamente /api/status e envia uma participação completa para /api/responses. Só depois da confirmação de gravação mostra a despedida. UUID evita duplicações em reintentos. Só são guardados o código aleatório, data de envio, idioma, versão, consentimento e as sete respostas. Não são guardados nomes, email ou IP na base. Existe limitação temporária de pedidos por IP em memória no servidor; rever a configuração para a escala do estudo.

Administração: abrir /admin.html e entrar. O servidor protege os dados, não apenas a página. Filtros por categoria, idioma e datas, pesquisa por código, tabela de associações, motivos, detalhes e CSV. Exportação de dados apenas no painel; não existe exportação no ecrã final do participante.

A paleta permite escolha múltipla: a soma dos percentuais de cores pode superar 100%. Motivos referem-se ao conjunto de cores escolhido, não a uma cor individual. Os indicadores usam apenas participações completas.

## Versão de Sites

A publicação atual é estática. Não executa server.mjs nem SQLite. Nesse modo, as participações de teste ficam no localStorage do mesmo navegador. O painel mostra explicitamente “DEMONSTRAÇÃO LOCAL”; não reúne respostas de pessoas em outros dispositivos. Não há proteção de equipa para esses dados locais de demonstração. Limpar dados do navegador elimina essas provas. Não confundir este modo com recolha de investigação.

Para dados reais partilhados, executar o servidor próprio acima. Não carregar respostas reais num alojamento público estático.

## Metodologia

O pedido de tingir o ícone foi implementado após selecionar cores: máscara SVG alfa e faixas verticais de largura igual, na ordem da paleta. O ícone começa neutro. A cor pode influenciar seleções seguintes; registar este feedback como parte do estímulo e validar o protocolo com o professor antes da recolha. Atualizada versão do protocolo para piloto-3-idiomas-feedback. As três línguas mantêm os mesmos códigos de dados, paleta e categorias; a língua é guardada por participação.

Antes da recolha definitiva, definir contacto da equipa, período de conservação e confirmar se o protocolo e o consentimento estão aprovados. Estes campos institucionais não foram inventados nesta entrega.
