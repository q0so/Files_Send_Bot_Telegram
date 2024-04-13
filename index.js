const { Telegraf } = require('telegraf');

const http = require('http');

const requestHandler = (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Ya Allah \n By Al_Iraq1');
};

const server = http.createServer(requestHandler);

const port = 3000;

server.listen(port, (err) => {
  if (err) {
    return console.log('Something went wrong: ', err);
  }

  console.log(`Server is listening on port ${port}`);
});

const bot = new Telegraf('6668072595:AAF5uTZeNcsX0dEWfWecYvt2tFgU_Wje2aA');

bot.start((ctx) => ctx.reply('Welcome! Send me a file. \n In this bot you can upload files \n But you need to know : \n 1.After uplead any file you cant delete file after upload \n How to use ? \n Only upload your file and will upload \n The maximum space the bot can upload is 25MB per file \n\n By Al_Iraq1'));

bot.on('document', async (ctx) => {
  try {
    const file = await ctx.telegram.getFile(ctx.message.document.file_id);
    const fileLink = `https://api.telegram.org/file/bot${'6668072595:AAF5uTZeNcsX0dEWfWecYvt2tFgU_Wje2aA'}/${file.file_path}`;
    ctx.reply(`File uploaded successfully. Here's the link: ${fileLink}`);
  } catch (error) {
    console.error('Error fetching file:', error);
    ctx.reply('There was an error processing your request.');
  }
});

bot.launch();
