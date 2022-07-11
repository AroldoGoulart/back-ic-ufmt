import express from 'express'

const app = express()
import { PrismaClient, user } from '@prisma/client'
const prisma = new PrismaClient()

app.use(express.json())

  app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/user', async (req, res) => {
  console.log(req.body)
  const user = req.body as user
  const response = await prisma.user.create({
    data: {
      user_email: user.user_email,
      user_name: user.user_name,
      user_type: user.user_type,
      user_password: user.user_password,
      user_matriculation: user.user_matriculation,
      user_photo: user.user_photo
    }
  })
  res.send('ok')
})

app.get('/user/:id', async function(req,res) {
  const id_searched = Number.parseInt(req.params.id)
  const response = await prisma.user.findUnique({
    where: {
      user_id: id_searched
    },
    select: {
      user_id:true,
      user_email:true,
      user_photo: true
    }
  })

  res.json(response)
})

app.get('/local', async function(req,res) {
    const response = await prisma.local.findMany()

    res.json(response)
})

app.get('/reports', async function(req,res) {
  const response = await prisma.report.findMany({
    include: {
      user: {
        select: {
          user_id:true,
          user_photo:true,
          user_email:true,
          user_name:true
        }
      }
    }
  })

  res.json(response)
})


app.get('/salas', function(req,res) {
    res.send('Sala1, sala2, cb-04')
})

app.listen(3000)