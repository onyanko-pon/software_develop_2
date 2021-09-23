import '../styles/globals.css'
import { initializeStore } from '../store'
import { Provider } from 'react-redux'
import Header from '../components/Header'
import { Container, AppBar, Toolbar, IconButton, Menu, Typography, Box } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import TopTitle from '../components/TopTitle'

const MyApp = ({ Component, pageProps }) => {
  const store = initializeStore()
  return <Box style={{ background: "#EAEEF3"}} >
    <Provider store={store}>
      <Header />
      <AppBar sx={{background: blueGrey[500]}} position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            時間割自動生成
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        <Container fixed>
          <TopTitle />
          <Component {...pageProps} />
        </Container>
      </main>

      <footer></footer>
    </Provider>
  </Box>
}

export default MyApp
