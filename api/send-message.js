const https = require('https');

export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешен' });
  }

  try {
    const { childName, childAge, courseName, contactType, parentPhone, parentTelegram, parentInstagram } = req.body;

    // Валидация
    if (!childName || !childAge || !contactType) {
      return res.status(400).json({ error: 'Заполните все обязательные поля' });
    }

    // Формируем сообщение
    let message = `📝 <b>Новая запись на курс:</b>\n\n`;
    message += `👧 <b>Имя ребёнка:</b> ${childName}\n`;
    message += `🎂 <b>Возраст:</b> ${childAge} лет\n`;
    message += `📚 <b>Курс:</b> ${courseName || 'Не выбран'}\n`;
    message += `\n📞 <b>Способ связи:</b>\n`;

    if (contactType === 'phone') {
      message += `📱 Телефон: <code>${parentPhone}</code>\n`;
    } else if (contactType === 'telegram') {
      message += `💬 Telegram: <code>${parentTelegram}</code>\n`;
    } else if (contactType === 'instagram') {
      message += `📸 Instagram: <code>${parentInstagram}</code>\n`;
    }

    // Отправляем в Telegram через Bot API
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return res.status(500).json({
        error: 'Ошибка конфигурации сервера. Пожалуйста, обратитесь в поддержку.'
      });
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const payload = JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });

    return new Promise((resolve) => {
      const postReq = https.request(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (response) => {
        let data = '';
        response.on('data', chunk => data += chunk);
        response.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (result.ok) {
              resolve(res.status(200).json({
                success: true,
                message: '✅ Запись успешно отправлена в Telegram!'
              }));
            } else {
              resolve(res.status(400).json({
                error: result.description || 'Ошибка при отправке'
              }));
            }
          } catch (e) {
            resolve(res.status(500).json({ error: 'Ошибка парсинга' }));
          }
        });
      });

      postReq.on('error', (err) => {
        resolve(res.status(500).json({ error: err.message }));
      });

      postReq.write(payload);
      postReq.end();
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
