const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '811568958065-pcj1ra544kmkbpqgtcg5r6ooquojqa6b.apps.googleusercontent.com';
const CLIENT_SECRET = '3ehQMTGvos0cq5OK8-bEHOyJ';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04QbwTv25t4YrCgYIARAAGAQSNwF-L9Ir1sHpHWA_8JJm45ac--XUPVR04eU8vee6bstH0xDoA-Wg14D4zgLaslxAw8oBAgYbPS8';
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});


const filePath = path.join(__dirname, "Helo.txt")


async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'Helo.txt', //This can be name of your choice
                mimeType: '*/txt',
            },
            media: {
                mimeType: '*/txt',
                body: fs.createReadStream(filePath),
            },
        });

        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}
uploadFile()