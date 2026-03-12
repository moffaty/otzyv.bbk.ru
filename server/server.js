import express from 'express'
import prisma from './prisma/client.js'
import axios from 'axios'
import 'dotenv/config'

const app = express()
const BOT_TOKEN = '7489603612:AAHU5-Ff3q5JE21oxl_ZeIGGGBpmZwUHVg8'
const admin_pwd = 'VrA7uS6UAbcS37R'

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Add Authorization header if needed
    next()
})
app.use(express.json())

export function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let randomString = ''
    for (let i = 0; i < 9; i++) {
        randomString += characters.charAt(
            Math.floor(Math.random() * characters.length)
        )
    }
    return randomString
}

// Port to listen on (default: 3000)
const port = process.env.PORT || 3000

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/falsifyforms', async (req, res) => {
    try {
        const result = await prisma.form.updateMany({
            data: {
                isSelected: false,
            },
        })
        return res.status(200).json(result)
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: true })
    }
})
app.get('/api/randomnumber', async (req, res) => {
    try {
        const { pwd } = req.query
        if (pwd != admin_pwd) {
            return res
                .status(400)
                .json({ error: true, message: 'Invalid password' })
        }

        const countSelectedForms = await prisma.form.count({
            where: {
                isSelected: true,
            },
        })

        if (countSelectedForms > 4) {
            return res
                .status(409)
                .json({ error: true, message: 'Raffle is over' })
        }

        const allUnselectedForms = await prisma.form.findMany({
            where: {
                isSelected: false,
            },
        })

        if (!allUnselectedForms.length) {
            return res
                .status(400)
                .json({ error: true, message: 'No free forms left' })
        }

        const allUnselectedFormIds = allUnselectedForms.map((f) => f.id)
        const random = Math.floor(Math.random() * allUnselectedFormIds.length)
        const randomId = allUnselectedFormIds[random]
        const selectForm = await prisma.form.update({
            where: {
                id: randomId,
            },
            data: {
                isSelected: true,
            },
        })
        console.log(selectForm.id, selectForm.code)
        return res.status(200).json(selectForm)
    } catch (e) {
        console.error('Error selecting form:', e)
        return res.status(400).json({
            error: true,
            message: 'An error occurred while selecting the form',
        })
    }
})

async function getphoto(file_id) {
    if (!file_id) {
        return false
    }

    try {
        // Step 1: Get the file path
        console.log('in try block')
        const filePathUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${file_id}`
        const filePathResponse = await axios.get(filePathUrl)
        const filePathResult = filePathResponse.data
        console.log('got data', filePathResponse.data)

        if (!filePathResult.ok) {
            return false
        }

        const filePath = filePathResult.result.file_path
        console.log('got file path', filePathResult.result.file_path)

        // Step 2: Download the file
        const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`
        const fileResponse = await axios.get(fileUrl, {
            responseType: 'arraybuffer',
        })

        if (fileResponse.status !== 200) {
            return false
        }

        console.log('file response status', fileResponse.status)

        // Step 3: Convert file content to base64
        const fileContent = Buffer.from(fileResponse.data, 'binary').toString(
            'base64'
        )

        return fileContent
    } catch (error) {
        console.error(error)
        return false
    }
}

app.post('/api/newform', async (req, res) => {
    try {
        console.log(req.body)

        let unique = false
        let newCode

        // if code unique - go to the next step, if not unique - generate and check again
        while (!unique) {
            newCode = generateRandomString()
            const codeExist = await prisma.form.findFirst({
                where: {
                    code: newCode,
                },
            })

            if (!codeExist) {
                unique = true
            }
        }

        const newForm = await prisma.form.create({
            data: {
                caption: req.body.caption,
                photo: req.body.photo,
                code: newCode,
            },
        })

        return res.status(200).json(newForm)
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: true })
    }
})

app.delete('/api/admin/form', async (req, res) => {
    try {
        const { formId, pwd } = req.body
        if (pwd != admin_pwd) {
            return res
                .status(400)
                .json({ error: true, message: 'Invalid password' })
        }

        if (!formId) {
            return res.status(400).json({ error: true })
        }

        const deletedForm = await prisma.form.delete({
            where: {
                id: parseInt(formId),
            },
        })

        if (!deletedForm) {
            return res.status(400).json({ error: true })
        }

        return res.status(200).json({ ...deletedForm, error: false })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: true })
    }
})

app.patch('/api/admin/form', async (req, res) => {
    try {
        const { formId, pwd } = req.body

        if (pwd != admin_pwd) {
            return res.status(400).json({ error: true })
        }

        const formExist = await prisma.form.findFirst({
            where: {
                id: parseInt(formId),
            },
        })

        if (!formExist) {
            return res.status(200).json({ error: true })
        }

        const checkForm = await prisma.form.update({
            where: {
                id: formExist.id,
            },
            data: {
                checked: true,
            },
        })

        if (!checkForm) {
        }
    } catch (e) {
        return res.status(400).json({ error: true })
    }
})

app.patch('/api/admin/form/approve', async (req, res) => {
    try {
        const { formId, pwd } = req.body
        if (!formId) {
            return res.status(400).json({ error: true })
        }

        if (pwd != admin_pwd) {
            return res
                .status(400)
                .json({ error: true, message: 'Invalid password' })
        }

        const form = await prisma.form.findFirst({
            where: {
                id: parseInt(formId),
            },
        })

        if (!form) {
            return res.status(400).json({ error: true })
        }

        const approvedForm = await prisma.form.update({
            where: {
                id: form.id,
            },
            data: {
                checked: true,
            },
        })
        return res.status(200).json(approvedForm)
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: true })
    }
})
app.get('/api/admin/getforms', async (req, res) => {
    try {
        console.log(1)
        const { pwd, page = 1, perPage = 10, formStatus } = req.query

        const bool_checked =
            formStatus === 'false'
                ? false
                : formStatus === 'true'
                ? true
                : false

        if (pwd != admin_pwd) {
            return res.status(400).json({ error: true })
        }

        const pageInt = parseInt(page)
        const perPageInt = parseInt(perPage)

        const [forms, totalCount] = await Promise.all([
            prisma.form.findMany({
                skip: (pageInt - 1) * perPageInt,
                take: perPageInt,
                where: {
                    checked: bool_checked,
                },
            }),
            prisma.form.count(), // Get the total count of forms for pagination
        ])

        console.log(forms)

        const parsedForms = []

        for (let i = 0; i < forms.length; i++) {
            const f = forms[i]
            const middleSize = parseInt(f.photo.length / 2)
            const base64photo = await getphoto(f.photo[middleSize].file_id)
            parsedForms.push({ ...f, photo: base64photo })
        }

        return res.status(200).json({ forms: parsedForms, totalCount })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: true })
    }
})

// Start the server
app.listen(port, async () => {
    console.log(`Server listening on  http://localhost:${port}`)
})
