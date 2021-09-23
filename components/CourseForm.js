import { useState } from "react"
import { connect } from 'react-redux'
import { TextField, Box, Button } from '@mui/material'

const CourseForm = (props) => {
  const [name, setName] = useState("")

  return <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', alignItems: 'center', display: 'flex' }}>
    <TextField label="クラスを入力" variant="outlined"
      sx={{ mr: '10px' }}
      value={name}
      onKeyPress={(e) => {
        if (e.code == "Enter") {
          props.createCourse({ name })
          setName("")
        }
      }}
      onChange={e => setName(e.target.value)}
    />
    <Button variant="outlined"
      onClick={() => {
        props.createCourse({ name })
        setName("")
      }}
    >追加</Button>
  </Box>
}

const mapDispatchToProps = (dispatch) => {
  return {
    createCourse: (course) => dispatch({ type: 'CREATE_COURSE', data: { course } })
  }
}

export default connect(null, mapDispatchToProps)(CourseForm)
