'use strict';
window.LANGUAGES={pt:'pt-PT',en:'en',es:'es'};
const translations={
'De que cor é o teu supermercado?':['What colour is your supermarket?','¿De qué color es tu supermercado?'],
'Apresentação do estudo':['Study introduction','Presentación del estudio'],
'Etapas de apresentação':['Introduction steps','Pasos de bienvenida'],
'Questionário':['Survey','Cuestionario'],
'Bem-vindo':['Welcome','Bienvenido'],
'Que cores associas aos alimentos? Partilha as tuas escolhas neste breve questionário.':['Which colours do you associate with food? Share your choices in this short survey.','¿Qué colores asocias con los alimentos? Comparte tus elecciones en esta breve encuesta.'],
'De que cor é o teu':['What colour is your','¿De qué color es tu'],
'supermercado?':['supermarket?','supermercado?'],
'Um estudo académico sobre cores e alimentos. Participar é voluntário, sem nome nem email. Podes sair a qualquer momento antes de concluir.':['An academic study about colours and food. Participation is voluntary, with no name or email required. You can leave at any time before finishing.','Un estudio académico sobre colores y alimentos. Participar es voluntario, sin nombre ni correo. Puedes salir en cualquier momento antes de terminar.'],
'Modo de teste: respostas guardadas apenas neste navegador.':['Test mode: responses saved only in this browser.','Modo de prueba: las respuestas se guardan solo en este navegador.'],
'Consentimento':['Consent','Consentimiento'],
'Tenho 18 anos ou mais e aceito participar e partilhar as respostas para este estudo.':['I am 18 or older and agree to participate and share my responses for this study.','Tengo 18 años o más y acepto participar y compartir mis respuestas para este estudio.'],
'Seguinte':['Next','Siguiente'],'Começar':['Start','Comenzar'],'Voltar':['Back','Volver'],
'Instruções':['Instructions','Instrucciones'],
'Escolhe as cores que associas a cada categoria. Podes repetir cores ou indicar que não associas nenhuma. Depois, conta-nos porquê. Não há respostas certas ou erradas!':['Choose the colours you associate with each category. You can reuse colours or choose no association. Then tell us why. There are no right or wrong answers!','Elige los colores que asocias con cada categoría. Puedes repetir colores o indicar que no asocias ninguno. Después, cuéntanos por qué. ¡No hay respuestas correctas o incorrectas!'],
'Seleciona as cores':['Select colours','Selecciona los colores'],'Selecionar cores':['Confirm colours','Seleccionar colores'],
'Não associo nenhuma cor':['I do not associate any colour','No asocio ningún color'],
'Escolhe uma ou mais cores.':['Choose one or more colours.','Elige uno o más colores.'],
'cor selecionada':['colour selected','color seleccionado'],'cores selecionadas':['colours selected','colores seleccionados'],
'Conta-nos porquê':['Tell us why','Cuéntanos por qué'],
'O que influenciou a tua escolha?':['What influenced your choice?','¿Qué influyó en tu elección?'],
'Queres explicar porquê?':['Would you like to explain why?','¿Quieres explicar por qué?'],
'Explicar é opcional.':['An explanation is optional.','La explicación es opcional.'],
'Podes escolher vários motivos.':['You can select several reasons.','Puedes elegir varios motivos.'],
'Cor dos alimentos.':['Food colours.','Color de los alimentos.'],
'Embalagens ou marcas.':['Packaging or brands.','Envases o marcas.'],
'Cores das secções.':['Section colours.','Colores de las secciones.'],
'Sensação ou ideia associada.':['An associated feeling or idea.','Sensación o idea asociada.'],
'Preferência pessoal.':['Personal preference.','Preferencia personal.'],
'Não sei explicar.':['I cannot explain.','No sé explicarlo.'],
'Outra razão.':['Another reason.','Otra razón.'],
'Qual foi a outra razão?':['What was the other reason?','¿Cuál fue la otra razón?'],
'Escreve uma breve explicação…':['Write a short explanation…','Escribe una breve explicación…'],
'Continuar':['Continue','Continuar'],'Concluir participação':['Finish survey','Finalizar encuesta'],'Alterar cores':['Change colours','Cambiar colores'],
'Escolhe uma cor ou indica que não associas nenhuma.':['Choose a colour or select no association.','Elige un color o indica que no asocias ninguno.'],
'Seleciona um motivo ou “Não sei explicar”.':['Select a reason or “I cannot explain”.','Elige un motivo o «No sé explicarlo».'],
'Escreve a outra razão ou desmarca essa opção.':['Write the other reason or uncheck that option.','Escribe la otra razón o desmarca esa opción.'],
'A guardar…':['Saving…','Guardando…'],'A concluir…':['Finishing…','Finalizando…'],
'Não foi possível guardar. As escolhas continuam nesta página. Verifica a ligação ou o armazenamento do navegador e tenta novamente.':['Could not save. Your choices are still on this page. Check your connection or browser storage and try again.','No se pudo guardar. Tus elecciones siguen en esta página. Revisa la conexión o el almacenamiento del navegador e inténtalo de nuevo.'],
'Tentar guardar novamente':['Try saving again','Volver a intentar'],
'Queres sair?':['Would you like to leave?','¿Quieres salir?'],
'Se saíres, perdes as escolhas desta participação. Nada foi enviado.':['If you leave, you will lose your choices for this session. Nothing has been submitted.','Si sales, perderás las elecciones de esta participación. No se ha enviado nada.'],
'Continuar a responder':['Keep answering','Seguir respondiendo'],'Sair e descartar respostas':['Leave and discard responses','Salir y descartar respuestas'],
'Obrigada pela':['Thank you for','Gracias por'],
'tua perspetiva.':['your perspective.','tu perspectiva.'],
'As tuas escolhas ajudam-nos a explorar a ligação entre cores, alimentos e sinalização nos supermercados. Obrigada por participares!':['Your choices help us explore the link between colours, food and supermarket signs. Thank you for taking part!','Tus elecciones nos ayudan a explorar la relación entre colores, alimentos y señalización en supermercados. ¡Gracias por participar!'],
'Voltar ao início':['Back to home','Volver al inicio'],
'Sair do questionário':['Leave survey','Salir de la encuesta'],
'Categoria atual':['Current category','Categoría actual'],
'Cores disponíveis — podes selecionar várias':['Available colours — select one or more','Colores disponibles: puedes elegir varios'],
'Peixe e marisco':['Fish and seafood','Pescado y marisco'],
'Peixe e marisco frescos, como sardinha, salmão, camarão e amêijoas.':['Fresh fish and seafood, such as sardines, salmon, shrimp and clams.','Pescado y marisco frescos, como sardina, salmón, camarones y almejas.'],
'Fruta e legumes':['Fruit and vegetables','Frutas y verduras'],
'Fruta fresca, verduras e outros legumes frescos.':['Fresh fruit, leafy greens and other fresh vegetables.','Frutas, hortalizas y otras verduras frescas.'],
'Carne':['Meat','Carne'],
'Carne fresca de vaca, porco, frango e outras aves.':['Fresh beef, pork, chicken and other poultry.','Carne fresca de vacuno, cerdo, pollo y otras aves.'],
'Leite e derivados':['Milk and dairy','Leche y derivados'],
'Leite, queijo, iogurtes e outros produtos derivados do leite.':['Milk, cheese, yoghurt and other dairy products.','Leche, queso, yogures y otros productos lácteos.'],
'Pão e pastelaria':['Bread and pastries','Pan y pastelería'],
'Pão, bolos, croissants e outros produtos de padaria e pastelaria.':['Bread, cakes, croissants and other bakery products.','Pan, pasteles, cruasanes y otros productos de panadería y pastelería.'],
'Congelados':['Frozen foods','Congelados'],
'Alimentos vendidos congelados, como refeições, vegetais, peixe e gelados.':['Frozen foods such as meals, vegetables, fish and ice cream.','Alimentos congelados, como comidas preparadas, verduras, pescado y helados.'],
'Bebidas':['Drinks','Bebidas'],
'Água, refrigerantes, sumos e outras bebidas não alcoólicas.':['Water, soft drinks, juices and other non-alcoholic drinks.','Agua, refrescos, zumos y otras bebidas sin alcohol.'],
'Vermelho':['Red','Rojo'],'Amarelo':['Yellow','Amarillo'],'Laranja':['Orange','Naranja'],'Verde':['Green','Verde'],'Azul':['Blue','Azul'],'Roxo':['Purple','Morado'],'Castanho':['Brown','Marrón'],'Rosa':['Pink','Rosa'],'Branco':['White','Blanco'],'Preto':['Black','Negro'],'Cinzento':['Grey','Gris'],'Bege':['Beige','Beige'],
'Um carrinho de compras com um coração e a mensagem Obrigado!':['A shopping cart with a heart and a thank-you message.','Un carrito de compras con un corazón y un mensaje de agradecimiento.'],
'Sobre ti':['About you','Sobre ti'],
'Estas perguntas ajudam-nos a interpretar as respostas. São todas obrigatórias e anónimas.':['These questions help us interpret the responses. All are required and anonymous.','Estas preguntas nos ayudan a interpretar las respuestas. Todas son obligatorias y anónimas.'],
'Idade':['Age','Edad'],'País':['Country','País'],'Género':['Gender','Género'],
'Seleciona…':['Select…','Selecciona…'],'Seleciona o teu país…':['Select your country…','Selecciona tu país…'],
'Feminino':['Female','Femenino'],'Masculino':['Male','Masculino'],'Não-binário':['Non-binary','No binario'],'Outro':['Other','Otro'],'Prefiro não dizer':['Prefer not to say','Prefiero no decirlo'],
'Com que frequência fazes compras de alimentos?':['How often do you shop for food?','¿Con qué frecuencia compras alimentos?'],
'Todos os dias':['Every day','Todos los días'],'Várias vezes por semana':['Several times a week','Varias veces por semana'],'Uma vez por semana':['Once a week','Una vez por semana'],'De quinze em quinze dias':['Every two weeks','Cada dos semanas'],'Uma vez por mês':['Once a month','Una vez al mes'],'Raramente':['Rarely','Raramente'],
'Onde costumas fazer compras? (uma ou mais opções)':['Where do you usually shop? (one or more options)','¿Dónde sueles comprar? (una o más opciones)'],
'Supermercado':['Supermarket','Supermercado'],'Loja de bairro':['Local shop','Tienda de barrio'],'Mercado de frescos (praça de mercado)':['Fresh market (market square)','Mercado de productos frescos (plaza de mercado)'],'Mercado online':['Online market','Mercado en línea'],
'Indica a tua idade (18 a 120).':['Enter your age (18 to 120).','Indica tu edad (18 a 120).'],'Seleciona o teu país.':['Select your country.','Selecciona tu país.'],'Seleciona uma opção.':['Select an option.','Selecciona una opción.'],'Seleciona pelo menos uma opção.':['Select at least one option.','Selecciona al menos una opción.'],
'Comentário (opcional)':['Comment (optional)','Comentario (opcional)'],'Queres acrescentar algo sobre esta escolha?':['Would you like to add anything about this choice?','¿Quieres añadir algo sobre esta elección?'],'Sem cor associada':['No colour associated','Sin color asociado'],
'Administração':['Administration','Administración']
};
let currentLanguage='pt';try{currentLanguage=localStorage.getItem('cores-language')||'pt';}catch{}
if(!LANGUAGES[currentLanguage])currentLanguage='pt';
window.getLanguage=()=>currentLanguage;
window.t=source=>currentLanguage==='pt'?source:(translations[source]?.[currentLanguage==='en'?0:1]||source);
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
