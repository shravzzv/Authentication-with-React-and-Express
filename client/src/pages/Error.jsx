import Navbar from '../components/Navbar'

export default function Error(props) {
  return (
    <>
      <Navbar {...props} />
      <h1>404</h1>
      <p>OOPS. There is nothing to see here.</p>
    </>
  )
}
