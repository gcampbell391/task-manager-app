const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send(({
        to: email,
        from: 'gcampbell391@gmail.com',
        subject: 'Welcome to the Task App!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send(({
        to: email,
        from: 'gcampbell391@gmail.com',
        subject: 'Sorry to see you go!',
        text: `We are sorry you're leaving ${name}. Let me know us know if there is anything we can do to change that.`
    })).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}