import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";


const flowBienvenida = addKeyword('hola').addAnswer('Hola, ¿en qué puedo ayudarte?');


const main = async () => {

    const provider = createProvider(BaileysProvider);

    provider.initHttpServer(3002);

    provider.http?.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const body = req.body;
        const message = body.message;
        const phone = body.phone;
        await bot.sendMessage(phone, message, {});
        res.end('Mensaje enviado');
    }));


    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })

};


main();