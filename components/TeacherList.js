import { connect } from 'react-redux'
import { List, ListItem, ListItemText, Box, Button } from '@mui/material'

const TeacherList = (props) => {
  return <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <List>
      {
        props.teacherList.map((teacher, i) =>
          <ListItem key={i}>
            <ListItemText
              primary={teacher.name}
              secondary={""}
            />
            {
              props.deletable ?
              <Button variant="outlined" onClick={() => props.deleteTeacher(teacher.id)}>削除</Button> :
              null
            }
          </ListItem>
        )
      }
    </List>
  </Box>
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
