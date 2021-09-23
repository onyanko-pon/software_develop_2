import { connect } from 'react-redux';
import Router from 'next/router'
import {Button} from '@mui/material'

import TeacherForm from '../components/TeacherForm'
import TeacherList from "../components/TeacherList"
import CourseForm from '../components/CourseForm';
import CourseList from '../components/CourseList';

const Home = (props) => {

  props.updateTitle("先生とクラス登録 | 時間割自動生成")
  props.updatePageTitle("先生とクラスの入力")

  return <>
    <p>先生</p>
    <TeacherForm />
    <TeacherList deletable={true} />

    <p>クラス</p>
    <CourseForm />
    <CourseList deletable={true} />

    <Button
      sx={{ mt: '15px', mb: '15px'}}
      variant="contained"
      onClick={async () => {
      const res = await handlePreMove(props.teacherList, props.courseList)
      if (res) {
        Router.push("/komasu")
      }
    }}>次へ</Button>
  </>
}

async function handlePreMove(teachers, courses) {
  const resTeachers = await fetch('/api/session/teachers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({teachers})
  })
  if (!resTeachers.status) {
    return false
  }

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

function mapStateToProps(state) {
  const { teacherList, courseList } = state
  return { teacherList, courseList }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTeacher: (deleteTeacherId) => dispatch({ type: 'DELETE_TEACHER', data: { deleteTeacherId } }),
    updateTitle: (title) => dispatch({ type: 'UPDATE_TITLE', data: { title } }),
    updatePageTitle: (topTitle) => dispatch({ type: 'UPDATE_TOP_TITLE', data: { topTitle } })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
