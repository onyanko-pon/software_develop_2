import { useState } from "react"
import { connect } from 'react-redux';

const CourseForm = (props) => {
  const [name, setName] = useState("")

  return <div>
    <input value={name}
      onKeyPress={(e) => {
        if (e.code == "Enter") {
          props.createCourse({ name })
          setName("")
        }
      }}
      onChange={e => setName(e.target.value)} />
    <input type="button" value="追加" onClick={() => {
      props.createCourse({ name })
      setName("")
    }} />
  </div>
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCourse: (course) => dispatch({ type: 'CREATE_COURSE', data: { course } })
  }
}

export default connect(null, mapDispatchToProps)(CourseForm)
