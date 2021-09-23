import { connect } from 'react-redux';
import { useRouter } from 'next/router'

import CourseList from '../components/CourseList'
import TeacherList from '../components/TeacherList'
import { useEffect } from 'react';
import SubjectForm from '../components/SubjectForm';
import SubjectList from '../components/SubjectList';
import KomasuList from '../components/KomasuList'

import { Button, Box } from '@mui/material'

const Courses = (props) => {
  const router = useRouter()
  props.setTitle("教科入力 | 時間割自動生成")
  props.setPageTitle("コマ数設定")

  useEffect(async () => {
    props.setCourses(props.initCourses)
    props.setTeachers(props.initTeachers)
  }, [])

  return <>

    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
    {props.courseList.map(course => {
      return <div key={course.id}>
        <p>クラス名:{course.name}</p>
        <SubjectForm course={course} />
        <SubjectList subjectList={course.subjects ?? []} teacherList={props.teacherList} />
      </div>
    })}
    </Box>

    <p>クラス</p>
    <CourseList />
    <p>コマ数</p>
    <KomasuList />

    <p>先生</p>
    <TeacherList />

    <Button
      sx={{ mt: '15px', mb: '15px' }}
      variant="contained"
      onClick={async () => {
      if (await handlePreMove(props.courseList)) {
        router.push("/confirm")
      }
      }}>次へ</Button>
  </>
}

const handlePreMove = async (courses) => {
  const resCourses = await fetch('/api/session/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ courses })
  })
  if (!resCourses.status) {
    return false
  }

  return true
}

Courses.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/session')
  const { teachers, courses } = await res.json()
  return {
    initTeachers: teachers,
    initCourses: courses
  }
}

const mapStateToProps = (state) => {
  const { courseList, teacherList } = state
  return { courseList, teacherList }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTitle: (title) => dispatch({ type: 'UPDATE_TITLE', data: { title } }),
    setCourses: (courses) => dispatch({ type: 'SET_COURSES', data: { courses } }),
    setTeachers: (teachers) => dispatch({ type: 'SET_TEACHERS', data: { teachers } }),
    setPageTitle: (topTitle) => dispatch({ type: 'UPDATE_TOP_TITLE', data: { topTitle } })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses)
