import { useState } from "react"
import { connect } from 'react-redux'
import { TextField, Box, Button } from '@mui/material'


const TeacherForm = (props) => {
  const [name, setName] = useState("")

  return <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', alignItems: 'center', display: 'flex' }}>
    <TextField label="先生を入力" variant="outlined"
      sx={{mr: '10px'}}
      value={name}
      onKeyPress={(e) => {
        if (e.code == "Enter") {
          props.createTeacher({ name })
          setName("")
        }
      }}
      onChange={e => setName(e.target.value)}
    />
    <Button variant="outlined"
      onClick={() => {
        props.createTeacher({ name })
        setName("")
      }}
    >追加</Button>
  </Box>
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    createTeacher: (teacher) => dispatch({ type: 'CREATE_TEACHER', data: { teacher } })
  }
}


export default connect(null, mapDispatchToProps)(TeacherForm)
