import { connect } from 'react-redux'
import { List, ListItem, ListItemText, Box} from '@mui/material'


const SubjectList = (props) => {

  const getTeacher = (teacherId) => {
    return props.teacherList.find(teacher => teacher.id == teacherId)
  }

  return <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
      {
        props.subjectList.map((subject, i) =>
          <ListItem key={i}>
            <ListItemText
              primary={subject.name}
              secondary={getTeacher(subject.teacherId).name}
            />
          </ListItem>
        )
      }
    </List>
  </Box>
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const mapStateToProps = (state) => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectList)
