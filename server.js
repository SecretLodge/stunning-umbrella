import { transporter } from './email.js'
import express from 'express'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors'

const PORT = process.env.PORT || 8080

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const corsOptions = {
  origin: 'http://localhost:5173',
  optionSuccessStatus: 200
}

app.post('/email', cors(corsOptions), async (req, res) => {
    const { name, number } = req.body;
    
    transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: 'Новая заявка на сайте СТРОЙСОЮЗ59',
        text: `Имя: ${name}; Номер телефона: ${number}`
    }, error => {
        if(error) return res.send({result: false})
    })

    return res.send({result: true})
})

app.listen(PORT)
