import { connect } from 'react-redux';
// import { useRouter } from 'next/router'
import Router from 'next/router'

import TeacherForm from '../components/TeacherForm'
import TeacherList from "../components/TeacherList"
import CourseForm from '../components/CourseForm';
import CourseList from '../components/CourseList';

const Home = (props) => {
  // const router = useRouter()

  props.updateTitle("先生登録 | 時間割自動生成")

  return <>
    <p>先生</p>
    <TeacherForm />
    <TeacherList />

    <p>クラス</p>
    <CourseForm />
    <CourseList />

    <button onClick={async () => {
      const res = await handlePreMove(props.teacherList, props.courseList)
      if (res) {
        Router.push("/komasu")
      }
    }}>次へ</button>
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
    updateTitle: (title) => dispatch({ type: 'UPDATE_TITLE', data: { title } })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
