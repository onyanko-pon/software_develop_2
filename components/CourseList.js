import { connect } from 'react-redux'
import { List, ListItem, ListItemText, Box, Button } from '@mui/material'

const CourseList = (props) => {

  return <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <List>
      {
        props.courseList.map((course, i) =>
          <ListItem key={i}>
            <ListItemText
              primary={course.name}
              secondary={""}
            />
            {
              props.deletable ?
                <Button variant="outlined" onClick={() => props.deleteCourse(course.id)}>削除</Button> :
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
    deleteCourse: (deleteCourseId) => dispatch({ type: 'DELETE_COURSE', data: { deleteCourseId } })
  }
}

const mapStateToProps = (state) => {
  return { courseList: state.courseList }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList)
