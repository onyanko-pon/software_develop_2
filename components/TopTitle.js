import { connect } from 'react-redux'
import { Typography } from '@mui/material'


const TopTitle = (props) => {

  return <Typography
    variant="h4" color="inherit" component="div"
    sx={{mt: "28px", mb: "32px"}}
  >
    {props.topTitle}
  </Typography>
}

const mapStateToProps = (state) => {
  return {topTitle: state.topTitle}
}

export default connect(mapStateToProps)(TopTitle)
