const express = require('express')

const app = express()

// Routes
app.use('/api/', require('./routes/directory'))

const PORT = 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))