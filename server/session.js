const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  const session = req.session
  if (!session.teachers) {
    session.teachers = []
  }
  if (!session.courses) {
    session.courses = []
  }
  res.json({
    teachers: session.teachers,
    courses: session.courses
  })
})

router.post('/teachers', (req, res, next) => {
  console.log(req.body)
  const { teachers } = req.body
  console.log(teachers)
  req.session.teachers = teachers
  res.json({teachers})
})

router.post('/courses', (req, res, next) => {
  const { courses } = req.body
  req.session.courses = courses
  res.json({ courses })
})

module.exports = router