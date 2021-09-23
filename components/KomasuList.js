import { connect } from 'react-redux'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'


const CourseList = (props) => {
  return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>クラス名</TableCell>
          <TableCell align="right">月曜日</TableCell>
          <TableCell align="right">火曜日</TableCell>
          <TableCell align="right">水曜日</TableCell>
          <TableCell align="right">木曜日</TableCell>
          <TableCell align="right">金曜日</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.courseList.map((course) => (
          <TableRow
            key={course.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {course.name}
            </TableCell>
            <TableCell align="right">{course.komasuList[0]}</TableCell>
            <TableCell align="right">{course.komasuList[1]}</TableCell>
            <TableCell align="right">{course.komasuList[2]}</TableCell>
            <TableCell align="right">{course.komasuList[3]}</TableCell>
            <TableCell align="right">{course.komasuList[4]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
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
