import { connect } from 'react-redux';


const TeacherList = (props) => {
  return <>
    {
      props.teacherList.length
    }人
    <ul>
      {
        props.teacherList.map((teacher) =>
          <li key={teacher.id}>
            {teacher.id}
            {teacher.name}
            <input style={{ marginLeft: "10px" }} type="button" onClick={() => props.deleteTeacher(teacher.id)} value={"削除"} />
          </li>
        )
      }
    </ul>
  </>
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTeacher: (deleteTeacherId) => dispatch({ type: 'DELETE_TEACHER', data: { deleteTeacherId } })
  }
}

const mapStateToProps = (state) => {
  return {teacherList: state.teacherList}
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherList)
