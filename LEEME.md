# Cores no supermercado

Questionário em HTML, CSS e JavaScript, com sete categorias, dez cores e três idiomas (português, inglês e espanhol).

## Ficheiros

- dist/index.html: questionário e apresentação.
- dist/style.css: estilo móvel e tipografia.
- dist/app.js: categorias, escolha de cores e fluxo.
- dist/i18n.js: traduções.
- dist/onboarding.js: apresentação inicial.
- dist/storage.js: deteção do servidor e guardado.
- dist/admin.html, admin.css e admin.js: painel de administração.
- server.mjs e lib/validate.mjs: servidor com SQLite e validação.

## Dois modos

**Servidor próprio:** lê GUIA-SERVIDOR.md. O Node guarda as participações completas em SQLite e o painel exige palavra-passe.

**Publicação estática / Sites:** funciona como demonstração local. O painel só lê respostas guardadas no navegador em que foi feita a participação. Não agrega dispositivos. A apresentação e o painel identificam este modo.

## Editar

Categorias, cores e motivos ficam em app.js. Traduções em i18n.js. A língua selecionada mantém-se ao voltar ao início e é guardada com cada participação. Não alterar estímulos durante uma recolha.

Um colorido tinge o ícone através de máscara SVG; vários usam faixas verticais iguais. Sem seleção ou sem associação, a ilustração é cinzenta. Os motivos referem-se ao conjunto de cores da categoria. O painel usa percentagens de seleção múltipla, cuja soma pode ultrapassar 100%.

A exportação CSV existe apenas no painel da equipa. Não há download nem eliminação da participação no ecrã final. O botão final regressa ao início e reinicia o questionário.

Não incluímos credenciais nem dados de teste na entrega. O ficheiro SQLite é criado na primeira execução, fora de dist/.
