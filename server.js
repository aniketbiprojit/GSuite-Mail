const express = require('express')
const { send_mail } = require('./send_mail')

const from_mail = 'from_mail@gmail.com'
const { MailData } = require('./email_content')
const subject = 'Test Mail'

const app = express()

app.use(express.json())

const port = 8080

app.post('send_mail', async (req, res) => {
	try {
		const { to_mail } = req.body
		await send_mail(from_mail, to_mail, subject, MailData)
		res.send('OK')
	} catch (err) {
		console.error(err)
		res.status(500).send(err)
	}
})

app.listen(port, () => console.log(`Listening on port ${port}`))
