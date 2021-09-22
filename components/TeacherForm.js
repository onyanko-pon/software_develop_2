import { useState } from "react"
import { connect } from 'react-redux';


const TeacherForm = (props) => {
  const [name, setName] = useState("")

  return <div>
    <input value={name}
      onKeyPress={(e) => {
        if (e.code == "Enter") {
          props.createTeacher({ name })
          setName("")
        }
      }}
      onChange={e => setName(e.target.value)} />
    <input type="button" value="追加"
      onClick={() => {
      props.createTeacher({ name })
      setName("")
    }} />
  </div>
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    createTeacher: (teacher) => dispatch({ type: 'CREATE_TEACHER', data: { teacher } })
  }
}


export default connect(null, mapDispatchToProps)(TeacherForm)
