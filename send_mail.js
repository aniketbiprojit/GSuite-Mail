
const MIMEText = require('mimetext')

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

async function send_mail(from_mail, to_email, subject, mail_data) {
	const auth = await getOAuth()
	try {
		let raw = make_mime(to_email, from_mail, subject, mail_data)

		const gmail = google.gmail({ version: 'v1', auth })

		return await gmail.users.messages.send({ userId: 'me', resource: { raw: raw } })
	} catch (err) {
		console.log(err)
		return 500
	}
}

// send_mail(from_mail,to_mail)

module.exports.send_mail = send_mail
