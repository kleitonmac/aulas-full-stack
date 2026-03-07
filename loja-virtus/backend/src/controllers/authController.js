const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const User = require('../models/User')

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })
    if (user) {
      res.status(400)
      throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()

    // send welcome email - can be extracted to service layer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Bem-vindo à Virtus Joias!',
      text: `Olá ${name}, obrigado por se registrar na Virtus Joias!`,
    }

    transporter
      .sendMail(mailOptions)
      .catch((err) => console.error('Email error', err))

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) return next(err)
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        })
      },
    )
  } catch (err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      res.status(400)
      throw new Error('Invalid credentials')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(400)
      throw new Error('Invalid credentials')
    }

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) return next(err)
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        })
      },
    )
  } catch (err) {
    next(err)
  }
}
