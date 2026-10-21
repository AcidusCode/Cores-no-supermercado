# Cores no supermercado

Cuestionario sobre asociaciones entre colores y categorías de alimentos, en portugués, inglés y español. Interfaz en HTML, CSS y JavaScript; servidor Node.js con SQLite y panel protegido.

## Ejecutar el proyecto

Se requiere Node.js 22.13 o superior (recomendado: Node.js 24). No necesita instalar paquetes externos.

1. Configura `ADMIN_PASSWORD` con al menos 12 caracteres en las variables de entorno del servidor. No la escribas en el repositorio.
2. Ejecuta `npm start`.
3. Abre `http://127.0.0.1:3000`. Panel: `http://127.0.0.1:3000/admin`.

SQLite se crea automáticamente en `data/respostas.db`. La carpeta de datos queda excluida de Git. Conserva esta carpeta entre despliegues.

Consulta **GUIA-SERVIDOR.md** para el VPS, HTTPS, configuración y copias de seguridad; **LEEME.md** para la organización del código.

## Subir a GitHub

Extrae el ZIP y sube el contenido de esta carpeta al repositorio, incluyendo `.gitignore`. No subas contraseñas, archivos `.env`, bases de datos ni respuestas de participantes.

GitHub aloja el código. Para recoger respuestas compartidas, ejecuta este proyecto en un VPS u otro alojamiento con Node.js y disco persistente. GitHub Pages solo sirve la demostración estática, cuyo panel lee pruebas del mismo navegador.

## Archivos principales

- `dist/`: página, traducciones, iconos, fuentes y panel.
- `server.mjs`: servidor y acceso a SQLite.
- `lib/validate.mjs`: validación de las respuestas.
- `package.json`: comando de inicio.
- `.gitignore`: exclusiones del repositorio.

La base y las credenciales no se incluyen. Las fuentes incluyen sus licencias.
