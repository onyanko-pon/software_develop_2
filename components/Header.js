import Head from 'next/head'
import { connect } from 'react-redux'

const Header = (props) => {

  return <Head>
    <title>{ props.title }</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
}

function mapStateToProps(state) {
  const { title } = state
  return { title }
}

export default connect(mapStateToProps)(Header)
