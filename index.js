const { Telegraf } = require('telegraf');

const http = require('http');

const requestHandler = (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World!\n');
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

bot.start((ctx) => ctx.reply('Welcome! Send me a file. \n Hi \n d'));

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
