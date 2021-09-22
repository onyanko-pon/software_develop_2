import { connect } from 'react-redux';


const CourseList = (props) => {
  return <>
    {
      props.courseList.length
    }人
    <ul>
      {
        props.courseList.map((course) =>
          <li key={course.id}>
            {course.id}
            {course.name}
            <input style={{ marginLeft: "10px" }} type="button" onClick={() => props.deleteCourse(course.id)} value={"削除"} />
          </li>
        )
      }
    </ul>
  </>
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCourse: (deleteCourseId) => dispatch({ type: 'DELETE_COURSE', data: { deleteCourseId } })
  }
}

const mapStateToProps = (state) => {
  return { courseList: state.courseList }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList)
