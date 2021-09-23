import { connect } from 'react-redux'
import { useRouter } from 'next/router'

import CourseList from '../components/CourseList'
import TeacherList from '../components/TeacherList'
import { useEffect } from 'react';
import KomasuForm from '../components/KomasuForm'
import { Button } from '@mui/material'

const Courses = (props) => {
  const router = useRouter()
  props.setTitle("コマ数設定 | 時間割自動生成")
  props.setPageTitle("コマ数設定")

  useEffect(async () => {
    const res = await fetch('/api/session')
    const { teachers, courses } = await res.json()
    props.setCourses(courses)
    props.setTeachers(teachers)
  }, [])

  return <>

    {props.courseList.map(course => {
      return <div key={course.id}>
        <p>{ course.name }</p>
        <KomasuForm courseId={course.id} />
      </div>
    })}

    <p>クラス</p>
    <CourseList />
    <p>先生</p>
    <TeacherList />

    <Button
      sx={{ mt: '15px', mb: '15px' }}
      variant="contained"
      onClick={async () => {
      if (await handlePreMove(props.courseList)) {
        router.push("/subjects")
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

const mapStateToProps = (state) => {
  const { courseList } = state
  return { courseList }
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
