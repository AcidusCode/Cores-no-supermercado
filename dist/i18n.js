'use strict';
window.LANGUAGES={pt:'pt-PT',en:'en',es:'es',it:'it'};
const translations={
'De que cor é o teu supermercado?':['What colour is your supermarket?','¿De qué color es tu supermercado?','Di che colore è il tuo supermercato?'],
'Apresentação do estudo':['Study introduction','Presentación del estudio','Presentazione dello studio'],
'Etapas de apresentação':['Introduction steps','Pasos de bienvenida','Passaggi di benvenuto'],
'Questionário':['Survey','Cuestionario','Questionario'],
'Bem-vindo':['Welcome','Bienvenido','Benvenuto'],
'Que cores associas aos alimentos? Partilha as tuas escolhas neste breve questionário.':['Which colours do you associate with food? Share your choices in this short survey.','¿Qué colores asocias con los alimentos? Comparte tus elecciones en esta breve encuesta.','Quali colori associ agli alimenti? Condividi le tue scelte in questo breve questionario.'],
'De que cor é o teu':['What colour is your','¿De qué color es tu','Di che colore è il tuo'],
'supermercado?':['supermarket?','supermercado?','supermercato?'],
'Um estudo académico sobre cores e alimentos. Participar é voluntário, sem nome nem email. Podes sair a qualquer momento antes de concluir.':['An academic study about colours and food. Participation is voluntary, with no name or email required. You can leave at any time before finishing.','Un estudio académico sobre colores y alimentos. Participar es voluntario, sin nombre ni correo. Puedes salir en cualquier momento antes de terminar.','Uno studio accademico sui colori e gli alimenti. Partecipare è volontario, senza nome né email. Puoi uscire in qualsiasi momento prima di concludere.'],
'Modo de teste: respostas guardadas apenas neste navegador.':['Test mode: responses saved only in this browser.','Modo de prueba: las respuestas se guardan solo en este navegador.','Modalità di prova: le risposte vengono salvate solo in questo browser.'],
'Consentimento':['Consent','Consentimiento','Consenso'],
'Tenho 18 anos ou mais e aceito participar e partilhar as respostas para este estudo.':['I am 18 or older and agree to participate and share my responses for this study.','Tengo 18 años o más y acepto participar y compartir mis respuestas para este estudio.','Ho 18 anni o più e accetto di partecipare e di condividere le mie risposte per questo studio.'],
'Seguinte':['Next','Siguiente','Avanti'],'Começar':['Start','Comenzar','Inizia'],'Voltar':['Back','Volver','Indietro'],
'Instruções':['Instructions','Instrucciones','Istruzioni'],
'Escolhe as cores que associas a cada categoria. Podes escolher mais do que uma cor, repetir cores ou indicar que não associas nenhuma. Não há respostas certas ou erradas!':['Choose the colours you associate with each category. You can choose more than one colour, reuse colours or choose no association. There are no right or wrong answers!','Elige los colores que asocias con cada categoría. Puedes elegir más de un color, repetir colores o indicar que no asocias ninguno. ¡No hay respuestas correctas o incorrectas!','Scegli i colori che associ a ogni categoria. Puoi scegliere più di un colore, ripetere i colori o indicare che non ne associ nessuno. Non ci sono risposte giuste o sbagliate!'],
'Seleciona as cores':['Select colours','Selecciona los colores','Seleziona i colori'],'Selecionar cores':['Confirm colours','Seleccionar colores','Conferma i colori'],
'Não associo nenhuma cor':['I do not associate any colour','No asocio ningún color','Non associo nessun colore'],
'Escolhe uma ou mais cores.':['Choose one or more colours.','Elige uno o más colores.','Scegli uno o più colori.'],
'cor selecionada':['colour selected','color seleccionado','colore selezionato'],'cores selecionadas':['colours selected','colores seleccionados','colori selezionati'],
'Conta-nos porquê':['Tell us why','Cuéntanos por qué','Raccontaci perché'],
'O que influenciou a tua escolha?':['What influenced your choice?','¿Qué influyó en tu elección?','Che cosa ha influenzato la tua scelta?'],
'Queres explicar porquê?':['Would you like to explain why?','¿Quieres explicar por qué?','Vuoi spiegare perché?'],
'Explicar é opcional.':['An explanation is optional.','La explicación es opcional.','Spiegare è facoltativo.'],
'Podes escolher vários motivos.':['You can select several reasons.','Puedes elegir varios motivos.','Puoi scegliere più motivi.'],
'Cor dos alimentos.':['Food colours.','Color de los alimentos.','Il colore degli alimenti.'],
'Embalagens ou marcas.':['Packaging or brands.','Envases o marcas.','Confezioni o marche.'],
'Cores das secções.':['Section colours.','Colores de las secciones.','I colori dei reparti.'],
'Sensação ou ideia associada.':['An associated feeling or idea.','Sensación o idea asociada.','Una sensazione o un’idea associata.'],
'Preferência pessoal.':['Personal preference.','Preferencia personal.','Preferenza personale.'],
'Não sei explicar.':['I cannot explain.','No sé explicarlo.','Non so spiegarlo.'],
'Outra razão.':['Another reason.','Otra razón.','Un altro motivo.'],
'Qual foi a outra razão?':['What was the other reason?','¿Cuál fue la otra razón?','Qual era l’altro motivo?'],
'Escreve uma breve explicação…':['Write a short explanation…','Escribe una breve explicación…','Scrivi una breve spiegazione…'],
'Continuar':['Continue','Continuar','Continua'],'Concluir participação':['Finish survey','Finalizar encuesta','Concludi il questionario'],'Alterar cores':['Change colours','Cambiar colores','Cambia i colori'],
'Escolhe uma cor ou indica que não associas nenhuma.':['Choose a colour or select no association.','Elige un color o indica que no asocias ninguno.','Scegli un colore o indica che non ne associ nessuno.'],
'Seleciona um motivo ou “Não sei explicar”.':['Select a reason or “I cannot explain”.','Elige un motivo o «No sé explicarlo».','Seleziona un motivo o «Non so spiegarlo».'],
'Escreve a outra razão ou desmarca essa opção.':['Write the other reason or uncheck that option.','Escribe la otra razón o desmarca esa opción.','Scrivi l’altro motivo o deseleziona questa opzione.'],
'A guardar…':['Saving…','Guardando…','Salvataggio in corso…'],'A concluir…':['Finishing…','Finalizando…','Conclusione in corso…'],
'Não foi possível guardar. As escolhas continuam nesta página. Verifica a ligação ou o armazenamento do navegador e tenta novamente.':['Could not save. Your choices are still on this page. Check your connection or browser storage and try again.','No se pudo guardar. Tus elecciones siguen en esta página. Revisa la conexión o el almacenamiento del navegador e inténtalo de nuevo.','Non è stato possibile salvare. Le tue scelte sono ancora in questa pagina. Controlla la connessione o la memoria del browser e riprova.'],
'Tentar guardar novamente':['Try saving again','Volver a intentar','Riprova a salvare'],
'Queres sair?':['Would you like to leave?','¿Quieres salir?','Vuoi uscire?'],
'Se saíres, perdes as escolhas desta participação. Nada foi enviado.':['If you leave, you will lose your choices for this session. Nothing has been submitted.','Si sales, perderás las elecciones de esta participación. No se ha enviado nada.','Se esci, perdi le scelte di questa partecipazione. Non è stato inviato nulla.'],
'Continuar a responder':['Keep answering','Seguir respondiendo','Continua a rispondere'],'Sair e descartar respostas':['Leave and discard responses','Salir y descartar respuestas','Esci e scarta le risposte'],
'Obrigada pela':['Thank you for','Gracias por','Grazie per'],
'tua perspetiva.':['your perspective.','tu perspectiva.','la tua prospettiva.'],
'As tuas escolhas ajudam-nos a explorar a ligação entre cores, alimentos e sinalização nos supermercados. Obrigada por participares!':['Your choices help us explore the link between colours, food and supermarket signs. Thank you for taking part!','Tus elecciones nos ayudan a explorar la relación entre colores, alimentos y señalización en supermercados. ¡Gracias por participar!','Le tue scelte ci aiutano a esplorare il legame tra colori, alimenti e segnaletica nei supermercati. Grazie per aver partecipato!'],
'Voltar ao início':['Back to home','Volver al inicio','Torna all’inizio'],
'Sair do questionário':['Leave survey','Salir de la encuesta','Esci dal questionario'],
'Categoria atual':['Current category','Categoría actual','Categoria attuale'],
'Cores disponíveis — podes selecionar várias':['Available colours — select one or more','Colores disponibles: puedes elegir varios','Colori disponibili: puoi sceglierne più di uno'],
'Peixe e marisco':['Fish and seafood','Pescado y marisco','Pesce e frutti di mare'],
'Peixe e marisco frescos, como sardinha, salmão, camarão e amêijoas.':['Fresh fish and seafood, such as sardines, salmon, shrimp and clams.','Pescado y marisco frescos, como sardina, salmón, camarones y almejas.','Pesce e frutti di mare freschi, come sardine, salmone, gamberi e vongole.'],
'Fruta e legumes':['Fruit and vegetables','Frutas y verduras','Frutta e verdura'],
'Fruta fresca, verduras e outros legumes frescos.':['Fresh fruit, leafy greens and other fresh vegetables.','Frutas, hortalizas y otras verduras frescas.','Frutta fresca, ortaggi a foglia e altra verdura fresca.'],
'Carne':['Meat','Carne','Carne'],
'Carne fresca de vaca, porco, frango e outras aves.':['Fresh beef, pork, chicken and other poultry.','Carne fresca de vacuno, cerdo, pollo y otras aves.','Carne fresca di manzo, maiale, pollo e altri volatili.'],
'Leite e derivados':['Milk and dairy','Leche y derivados','Latte e derivati'],
'Leite, queijo, iogurtes e outros produtos derivados do leite.':['Milk, cheese, yoghurt and other dairy products.','Leche, queso, yogures y otros productos lácteos.','Latte, formaggio, yogurt e altri prodotti derivati dal latte.'],
'Pão e pastelaria':['Bread and pastries','Pan y pastelería','Pane e pasticceria'],
'Pão, bolos, croissants e outros produtos de padaria e pastelaria.':['Bread, cakes, croissants and other bakery products.','Pan, pasteles, cruasanes y otros productos de panadería y pastelería.','Pane, torte, cornetti e altri prodotti di panetteria e pasticceria.'],
'Congelados':['Frozen foods','Congelados','Surgelati'],
'Alimentos vendidos congelados, como refeições, vegetais, peixe e gelados.':['Frozen foods such as meals, vegetables, fish and ice cream.','Alimentos congelados, como comidas preparadas, verduras, pescado y helados.','Alimenti venduti surgelati, come piatti pronti, verdure, pesce e gelati.'],
'Bebidas':['Drinks','Bebidas','Bevande'],
'Água, refrigerantes, sumos e outras bebidas não alcoólicas.':['Water, soft drinks, juices and other non-alcoholic drinks.','Agua, refrescos, zumos y otras bebidas sin alcohol.','Acqua, bibite gassate, succhi e altre bevande analcoliche.'],
'Vermelho':['Red','Rojo','Rosso'],'Amarelo':['Yellow','Amarillo','Giallo'],'Laranja':['Orange','Naranja','Arancione'],'Verde':['Green','Verde','Verde'],'Azul':['Blue','Azul','Blu'],'Roxo':['Purple','Morado','Viola'],'Castanho':['Brown','Marrón','Marrone'],'Rosa':['Pink','Rosa','Rosa'],'Branco':['White','Blanco','Bianco'],'Preto':['Black','Negro','Nero'],'Cinzento':['Grey','Gris','Grigio'],'Bege':['Beige','Beige','Beige'],
'Um carrinho de compras com um coração e a mensagem Obrigado!':['A shopping cart with a heart and a thank-you message.','Un carrito de compras con un corazón y un mensaje de agradecimiento.','Un carrello della spesa con un cuore e un messaggio di ringraziamento.'],
'Sobre ti':['About you','Sobre ti','Su di te'],
'Estas perguntas ajudam-nos a interpretar as respostas. São todas obrigatórias e anónimas.':['These questions help us interpret the responses. All are required and anonymous.','Estas preguntas nos ayudan a interpretar las respuestas. Todas son obligatorias y anónimas.','Queste domande ci aiutano a interpretare le risposte. Sono tutte obbligatorie e anonime.'],
'Idade':['Age','Edad','Età'],'País':['Country','País','Paese'],'Género':['Gender','Género','Genere'],
'Seleciona…':['Select…','Selecciona…','Seleziona…'],'Seleciona o teu país…':['Select your country…','Selecciona tu país…','Seleziona il tuo paese…'],
'Feminino':['Female','Femenino','Donna'],'Masculino':['Male','Masculino','Uomo'],'Não-binário':['Non-binary','No binario','Non binario'],'Outro':['Other','Otro','Altro'],'Prefiro não dizer':['Prefer not to say','Prefiero no decirlo','Preferisco non dirlo'],
'Com que frequência fazes compras de alimentos?':['How often do you shop for food?','¿Con qué frecuencia compras alimentos?','Con che frequenza fai la spesa alimentare?'],
'Todos os dias':['Every day','Todos los días','Ogni giorno'],'Várias vezes por semana':['Several times a week','Varias veces por semana','Più volte a settimana'],'Uma vez por semana':['Once a week','Una vez por semana','Una volta a settimana'],'De quinze em quinze dias':['Every two weeks','Cada dos semanas','Ogni due settimane'],'Uma vez por mês':['Once a month','Una vez al mes','Una volta al mese'],'Raramente':['Rarely','Raramente','Raramente'],'Nunca':['Never','Nunca','Mai'],
'Onde costumas fazer compras? (uma ou mais opções)':['Where do you usually shop? (one or more options)','¿Dónde sueles comprar? (una o más opciones)','Dove fai di solito la spesa? (una o più opzioni)'],
'Supermercado':['Supermarket','Supermercado','Supermercato'],'Loja de bairro':['Local shop','Tienda de barrio','Negozio di quartiere'],'Mercado de frescos (praça de mercado)':['Fresh market (market square)','Mercado de productos frescos (plaza de mercado)','Mercato di prodotti freschi (piazza del mercato)'],'Mercado online':['Online market','Mercado en línea','Mercato online'],
'Indica a tua idade (18 a 120).':['Enter your age (18 to 120).','Indica tu edad (18 a 120).','Indica la tua età (da 18 a 120).'],'Seleciona o teu país.':['Select your country.','Selecciona tu país.','Seleziona il tuo paese.'],'Seleciona uma opção.':['Select an option.','Selecciona una opción.','Seleziona un’opzione.'],'Seleciona pelo menos uma opção.':['Select at least one option.','Selecciona al menos una opción.','Seleziona almeno un’opzione.'],
'Comentário (opcional)':['Comment (optional)','Comentario (opcional)','Commento (facoltativo)'],'Queres acrescentar algo sobre esta escolha?':['Would you like to add anything about this choice?','¿Quieres añadir algo sobre esta elección?','Vuoi aggiungere qualcosa su questa scelta?'],'Sem cor associada':['No colour associated','Sin color asociado','Nessun colore associato'],
'Administração':['Administration','Administración','Amministrazione'],
'UM ESTUDO DE ERGONOMIA COGNITIVA':['A STUDY IN COGNITIVE ERGONOMICS','UN ESTUDIO DE ERGONOMÍA COGNITIVA','UNO STUDIO DI ERGONOMIA COGNITIVA'],
'PERCEÇÃO · ASSOCIAÇÃO · DESIGN':['PERCEPTION · ASSOCIATION · DESIGN','PERCEPCIÓN · ASOCIACIÓN · DISEÑO','PERCEZIONE · ASSOCIAZIONE · DESIGN'],
'Estudo académico · Respostas enviadas ao concluir.':['Academic study · Responses are sent when you finish.','Estudio académico · Las respuestas se envían al finalizar.','Studio accademico · Le risposte vengono inviate al termine.'],
'MODO DE DEMONSTRAÇÃO · As respostas não são enviadas.':['DEMO MODE · Responses are not sent.','MODO DE DEMOSTRACIÓN · Las respuestas no se envían.','MODALITÀ DEMO · Le risposte non vengono inviate.']
};
let currentLanguage='pt';try{currentLanguage=localStorage.getItem('cores-language')||'pt';}catch{}
if(!LANGUAGES[currentLanguage])currentLanguage='pt';
window.getLanguage=()=>currentLanguage;
window.t=source=>currentLanguage==='pt'?source:(translations[source]?.[{en:0,es:1,it:2}[currentLanguage]]||source);
// Capture only initial static text. Dynamic content is translated at rendering time.
const staticTexts=[];const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){const node=walker.currentNode;if(!node.parentElement.closest('script,style')&&translations[node.textContent.trim()])staticTexts.push([node,node.textContent.trim()]);}
const attrs=[];document.querySelectorAll('[aria-label],[placeholder],[alt],[title]').forEach(el=>{for(const key of ['aria-label','placeholder','alt','title'])if(translations[el.getAttribute(key)])attrs.push([el,key,el.getAttribute(key)]);});
window.applyLanguage=language=>{
 if(!LANGUAGES[language])return;currentLanguage=language;document.documentElement.lang=LANGUAGES[language];document.title=t('De que cor é o teu supermercado?');
 try{localStorage.setItem('cores-language',language);}catch{}
 staticTexts.forEach(([node,source])=>{if(node.isConnected)node.textContent=t(source);});attrs.forEach(([el,key,source])=>el.setAttribute(key,t(source)));
 const select=document.getElementById('language');if(select)select.value=language;
 window.renderOnboarding?.(false);window.renderProfileLanguage?.();
};
