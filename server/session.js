const express = require('express')
const router = express.Router()

const initTeachers = process.env.NODE_ENV !== "DEVELOPMENT_STYLE" ? [] : [
  { id: 0, name: "高橋先生" },
  { id: 1, name: "斎藤先生" },
  { id: 2, name: "山本先生" },
  { id: 3, name: "田中先生" },
  { id: 4, name: "山田先生" },
  { id: 5, name: "佐藤先生" },
  { id: 4, name: "坂本先生" },
]

const initCourses = process.env.NODE_ENV !== "DEVELOPMENT_STYLE" ? [] : [
  {
    id: 0, name: "3-1", komasuList: [1, 1, 1, 1, 1], subjects: [
      { name: "国語", teacherId: 0 },
      { name: "数学", teacherId: 1 },
      { name: "英語", teacherId: 2 },
      { name: "社会", teacherId: 3 },
      { name: "英語", teacherId: 4 },
    ]
  },
  {
    id: 1, name: "3-2", komasuList: [1, 1, 1, 1, 1], subjects: [
      { name: "国語", teacherId: 0 },
      { name: "数学", teacherId: 1 },
      { name: "英語", teacherId: 2 },
      { name: "社会", teacherId: 3 },
      { name: "英語", teacherId: 4 },
    ]
  },
  {
    id: 2, name: "3-3", komasuList: [1, 1, 1, 1, 1], subjects: [
      { name: "国語", teacherId: 0 },
      { name: "数学", teacherId: 1 },
      { name: "英語", teacherId: 2 },
      { name: "社会", teacherId: 3 },
      { name: "英語", teacherId: 4 },
    ]
  },
]

router.get('/', (req, res, next) => {
  const session = req.session
  console.log(session.teachers, !session.teachers)
  if (!session.teachers) {
    session.teachers = initTeachers
  }
  if (!session.courses) {
    session.courses = initCourses
  }
  console.log(session.teachers)
  res.json({
    teachers: session.teachers,
    courses: session.courses
  })
})

router.post('/teachers', (req, res, next) => {
  const { teachers } = req.body
  req.session.teachers = teachers
  res.json({teachers})
})

router.post('/courses', (req, res, next) => {
  const { courses } = req.body
  req.session.courses = courses
  res.json({ courses })
})

module.exports = router