const BOT_TOKEN = '7489603612:AAHU5-Ff3q5JE21oxl_ZeIGGGBpmZwUHVg8'
const CHAT_ID = -1002147867121

import axios from 'axios'

export async function sendPhotoWithDescription(photo, description) {
    try {
        const formData = new FormData()
        formData.append('chat_id', CHAT_ID)
        formData.append('photo', photo)
        formData.append('caption', description)

        const response = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    parse_mode: 'HTML', // Set parse_mode to 'HTML' to enable HTML formatting
                },
            }
        )
        console.log('Message sent:', response.data)
        return { success: true, data: response.data }
    } catch (error) {
        console.error('Error sending message:', error)
        return { success: false, data: error }
    }
}
