import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка RSVP-ответа гостя на почту молодожёнов"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')

    name = body.get('name', '—')
    attending = body.get('attending', '—')
    plus_one = body.get('plusOne', '—')
    plus_one_name = body.get('plusOneName', '—')
    food = body.get('food', '—')
    drinks = body.get('drinks', [])

    attending_text = 'Да, буду' if attending == 'yes' else 'К сожалению, нет'
    plus_one_text = 'Да, с парой' if plus_one == 'yes' else ('Приду один(а)' if plus_one == 'no' else '—')
    food_text = 'Мясо' if food == 'meat' else ('Рыба' if food == 'fish' else '—')
    drinks_text = ', '.join(drinks) if drinks else '—'

    html = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
        <h1 style="font-size: 2rem; font-weight: 300; text-align: center; color: #1a1a1a; margin-bottom: 8px;">
            Новый ответ RSVP
        </h1>
        <p style="text-align: center; color: #b8986a; font-size: 0.85rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 40px;">
            Артём &amp; Татьяна · 27 июня 2026
        </p>
        <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #e8e0d5;">
                <td style="padding: 14px 0; color: #888; font-size: 0.8rem; width: 40%;">Имя гостя</td>
                <td style="padding: 14px 0; font-size: 0.95rem;"><strong>{name}</strong></td>
            </tr>
            <tr style="border-bottom: 1px solid #e8e0d5;">
                <td style="padding: 14px 0; color: #888; font-size: 0.8rem;">Присутствие</td>
                <td style="padding: 14px 0; font-size: 0.95rem;">{attending_text}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e8e0d5;">
                <td style="padding: 14px 0; color: #888; font-size: 0.8rem;">Сопровождающий</td>
                <td style="padding: 14px 0; font-size: 0.95rem;">{plus_one_text}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e8e0d5;">
                <td style="padding: 14px 0; color: #888; font-size: 0.8rem;">Имя сопровождающего</td>
                <td style="padding: 14px 0; font-size: 0.95rem;">{plus_one_name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e8e0d5;">
                <td style="padding: 14px 0; color: #888; font-size: 0.8rem;">Предпочтения в еде</td>
                <td style="padding: 14px 0; font-size: 0.95rem;">{food_text}</td>
            </tr>
            <tr>
                <td style="padding: 14px 0; color: #888; font-size: 0.8rem;">Напитки</td>
                <td style="padding: 14px 0; font-size: 0.95rem;">{drinks_text}</td>
            </tr>
        </table>
        <p style="text-align: center; color: #ccc; font-size: 0.75rem; margin-top: 40px;">
            Свадебный сайт Артёма и Татьяны
        </p>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'RSVP: {name} — {"придёт" if attending == "yes" else "не придёт"}'
    msg['From'] = 'malyarevskaya_t_d@mail.ru'
    msg['To'] = 'malyarevskaya_t_d@mail.ru'
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    smtp = smtplib.SMTP_SSL('smtp.mail.ru', 465)
    smtp.login('malyarevskaya_t_d@mail.ru', os.environ['SMTP_PASSWORD'])
    smtp.sendmail('malyarevskaya_t_d@mail.ru', 'malyarevskaya_t_d@mail.ru', msg.as_string())
    smtp.quit()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
