const express = require('express')
const app = express()
const AuthRouter = require('./routes/auth')
const PORT = process.env.PORT || 3000
const sequelize = require('./config/db')

sequelize.sync()
app.use(express.json())
app.use('/api/auth', AuthRouter)
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})