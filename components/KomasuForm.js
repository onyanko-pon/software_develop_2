import { useEffect, useState } from "react"
import { connect } from 'react-redux';
import Box from '@mui/material/Box'

const KomasuForm = (props) => {
  const courseId = props.courseId
  const course = props.courseList[courseId]
  const initKomasuList = course.komasuList ?? [1,1,1,1,1]
  const [komasuList, setKomasuList] = useState(initKomasuList)

  useEffect(() => {
    props.updateCourse(courseId, { ...course, komasuList})
  }, [komasuList])

  return <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
    <>
      <p>月曜</p>
      <select value={komasuList[0]} onChange={(e) => {
        console.log(e.target.value)
        const newKomasuList = [...komasuList]
        newKomasuList[0] = e.target.value
        setKomasuList(newKomasuList)
      }}>
        {
          [1, 2, 3, 4, 5, 6, 7].map(id => {
            return <option key={id} value={id}>{ id }限</option>
          })
        }
      </select>
    </>

    <>
      <p>火曜</p>
      <select value={komasuList[1]} onChange={(e) => {
        const newKomasuList = [...komasuList]
        newKomasuList[1] = e.target.value
        setKomasuList(newKomasuList)
      }}>
        {
          [1, 2, 3, 4, 5, 6, 7].map(id => {
            return <option key={id} value={id}>{id}限</option>
          })
        }
      </select>
    </>

    <>
      <p>水曜</p>
      <select value={komasuList[2]} onChange={(e) => {
        const newKomasuList = [...komasuList]
        newKomasuList[2] = e.target.value
        setKomasuList(newKomasuList)
      }}>
        {
          [1, 2, 3, 4, 5, 6, 7].map(id => {
            return <option key={id} value={id}>{id}限</option>
          })
        }
      </select>
    </>

    <>
      <p>木曜</p>
      <select value={komasuList[3]} onChange={(e) => {
        const newKomasuList = [...komasuList]
        newKomasuList[3] = e.target.value
        setKomasuList(newKomasuList)
      }}>
        {
          [1, 2, 3, 4, 5, 6, 7].map(id => {
            return <option key={id} value={id}>{id}限</option>
          })
        }
      </select>
    </>

    <>
      <p>金曜</p>
      <select value={komasuList[4]} onChange={(e) => {
        const newKomasuList = [...komasuList]
        newKomasuList[4] = Number(e.target.value)
        setKomasuList(newKomasuList)
      }}>
        {
          [1, 2, 3, 4, 5, 6, 7].map(id => {
            return <option key={id} value={id}>{id}限</option>
          })
        }
      </select>
    </>
  </Box>
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCourse: (courseId, course) => dispatch({ type: 'UPDATE_COURSE', data: { course, courseId } })
  }
}

const mapStateToProps = (state) => {
  return {
    courseList: state.courseList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KomasuForm)
