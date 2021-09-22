import { connect } from 'react-redux';


const SubjectList = (props) => {

  const getTeacher = (teacherId) => {
    return props.teacherList.find(teacher => teacher.id == teacherId)
  }
  return <>
    {
      props.subjectList.length
    }人
    <ul>
      {
        props.subjectList.map((subject, i) =>
          <li key={i}>
            {subject.name}:
            {getTeacher(subject.teacherId).name}
          </li>
        )
      }
    </ul>
  </>
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectList)
