import { useEffect, useState } from "react"
import { connect } from 'react-redux';

const SubjectForm = (props) => {
  const course = props.course
  console.log(course)
  const subjectCounts = course.subjects ? course.subjects.length : 0
  const komasuCount = course.komasuList.reduce((sum, current) => sum + current, 0)
  const [name, setName] = useState("")
  const [teacherId, setTeacherId] = useState(0)

  return <>
    <p>教科数: {subjectCounts}/{komasuCount}</p>
    <input value={name} onChange={e => setName(e.target.value)} />
    <select value={teacherId} onChange={(e) => {
      setTeacherId(e.target.value)
    }}>
      {props.teacherList.map(teacher => {
        return <option key={teacher.id} value={teacher.id}>{ teacher.name }</option>
      })}
    </select>
    <input type="button" value="追加" onClick={() => {
      props.addSubjects(course, {name, teacherId})
      setName("")
    }} />
  </>
}

const mapDispatchToProps = (dispatch) => {
  return {
    addSubjects: (course, subject) => {
      const newCourse = { ...course }
      const subjects = course.subjects ? [...course.subjects, subject] : [subject]
      newCourse.subjects = subjects
      dispatch({
        type: 'UPDATE_COURSE',
        data: {
          courseId: course.id,
          course: newCourse
        }
      })
    }
  }
}

const mapStateToProps = (state) => {
  return { teacherList: state.teacherList}
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectForm)
