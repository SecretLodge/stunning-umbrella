import { transporter } from './email.js'
import express from 'express'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.post('/email', async (req, res) => {
    const { name, number } = req.body;
    
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: 'Новая заявка на сайте СТРОЙСОЮЗ59',
            text: `Имя: ${name}; Номер телефона: ${number}`
        })
        console.log('Письмо доставлено успешно')
        return res.send({ result: true })
    }
    catch {
        console.log('Письмо не доставлено')
        return res.send({ result: false })
    }
})

app.listen(PORT, 'localhost', () => console.log(`http://localhost:${PORT}`))
