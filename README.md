const { Telegraf } = require('telegraf');
const http = require('http');
const webpageURL = 'https://wkfowofk1r9wk10do1odo.glitch.me/';

const iframeCode = `<iframe height="100%" width="100%" src="${webpageURL}" frameborder="0" allowfullscreen></iframe> <style> *{ background-color: black; } </style>`;

const requestHandler = (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(iframeCode);
};

const server = http.createServer(requestHandler);

const port = 3000;

server.listen(port, (err) => {
  if (err) {
    return console.log('Something went wrong: ', err);
  }

  console.log(`Server is listening on port ${port}`);
});

const bot = new Telegraf(process.env.bot_token);

bot.start((ctx) => {
  ctx.reply('Welcome! Send me a file. \n In this bot you can upload files \n But you need to know : \n After uplead any file you cant delete file after upload \n How to use ? \n Only upload your file and will upload \n The maximum space the bot can upload is 20MB per file \n\n By Al_Iraq1 , v2');
  setTimeout(() => {
    ctx.reply('Frok this project on GitHub : https://github.com/q0so/Files_Send_Bot_Telegram  \n\n\n My YouTube: https://youtube.com/@Al_Iraq1/ \n\n My GitHub: https://github.com/q0so/ \n\n My Replit :  https://replit.com/@AlIraq1/');
  }, 5);
});

bot.on('document', async (ctx) => {
  try {
    const file = await ctx.telegram.getFile(ctx.message.document.file_id);
    const fileLink = `https://api.telegram.org/file/bot${process.env.bot_token}/${file.file_path}`;
    ctx.reply(`File uploaded successfully. Here's the link: ${fileLink}`);
  } catch (error) {
    console.error('Error fetching file:', error);
    ctx.reply('There was an error processing your request.');
  }
});

bot.launch();
