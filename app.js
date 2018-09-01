const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')
const favicon = require('serve-favicon')

const indexRouter = require('./api/index')
const adminRouter = require('./api/admin/index')
const merchantRouter = require('./api/merchant/index')
const userRouter = require('./api/user/index')
const orderRouter = require('./api/order/index')
const feedbackRouter = require('./api/feedback/index')

const models = require('./models')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//handle favicon.ico notfound using module serve-favicon
app.use(favicon(path.join(__dirname, './', 'favicon.ico')))

app.use('/', indexRouter)
app.use('/admins', adminRouter)
app.use('/merchants', merchantRouter)
app.use('/users', userRouter)
app.use('/orders', orderRouter)
app.use('/feedback', feedbackRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // show the error page
  res.status(err.status || 500)
  res.status(500).send({
    message: res.locals.message
  })
})

app.on('close', () => models.sequelize.close())

module.exports = app
