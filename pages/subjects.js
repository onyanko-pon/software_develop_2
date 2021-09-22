import { connect } from 'react-redux';
import { useRouter } from 'next/router'

import CourseList from '../components/CourseList'
import TeacherList from '../components/TeacherList'
import { useEffect } from 'react';
import SubjectForm from '../components/SubjectForm';
import SubjectList from '../components/SubjectList';

const Courses = (props) => {
  const router = useRouter()
  props.setTitle("教科入力 | 時間割自動生成")

  useEffect(async () => {
    props.setCourses(props.initCourses)
    props.setTeachers(props.initTeachers)
  }, [])

  return <>

    {props.courseList.map(course => {
      return <div key={course.id}>
        <p>クラス名:{course.name}</p>
        教科入力
        <SubjectForm course={course} />
        <SubjectList subjectList={course.subjects ?? []} teacherList={props.teacherList} />
      </div>
    })}

    <p>クラス</p>
    <CourseList />
    <p>コマ数</p>
    {
      props.courseList.map(course => {
        return <div key={course.id}>
          <p>クラス名: {course.name}</p>
          <p>
            月曜: {course.komasuList[0]},
            火曜: {course.komasuList[1]},
            水曜: {course.komasuList[2]},
            木曜: {course.komasuList[3]},
            金曜: {course.komasuList[4]}
          </p>
        </div>
      })
    }

    <p>先生</p>
    <TeacherList />

    <button onClick={async () => {
      if (await handlePreMove(props.courseList)) {
        router.push("/confirm")
      }
    }}>次へ</button>
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
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Courses)
