import express from 'express'
import AppRoutes from './src/routes/index.js'
import 'dotenv/config'

const app = express()

app.use(express.json())

app.use(AppRoutes)

app.listen(process.env.PORT,()=>console.log("App listening PORT : "+process.env.PORT))