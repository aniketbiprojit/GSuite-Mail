const to_mail = 'to_mail@gmail.com'
const from_mail = 'from_mail@gmail.com'

const MIMEText = require('mimetext')
const { MailData } = require('./email_content')
const { google } = require('googleapis')
const { getOAuth } = require('./authorize')

function make_mime(to, from, subject, msg) {
	const message = new MIMEText()
	message.setSender(from)
	message.setRecipient(to)
	message.setSubject(subject)
	message.setMessage(msg)

	return message.asEncoded()
}

async function send_mail(email) {
	const auth = await getOAuth()
	try {
		// console.log(MailData)
		let raw = make_mime(email, from_mail, 'SUBJECT: data', MailData)

		const gmail = google.gmail({ version: 'v1', auth })

		return await gmail.users.messages.send({ userId: 'me', resource: { raw: raw } })
	} catch (err) {
		console.log(err)
		return 500
	}
}

// send_mail(to_mail)

module.exports.send_mail = send_mail
