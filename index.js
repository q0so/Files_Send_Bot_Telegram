const { Telegraf } = require('telegraf');

const bot = new Telegraf('6668072595:AAF5uTZeNcsX0dEWfWecYvt2tFgU_Wje2aA');

bot.start((ctx) => ctx.reply('Welcome! Send me a file.'));

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
