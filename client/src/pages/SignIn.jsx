export default function SignIn() {
  return (
    <>
      <h1>Sign In</h1>
      <form>
        <div className='formControl'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='john doe'
          />
        </div>

        <div className='formControl'>
          <label htmlFor='password'>Password:</label>
          <input type='password' name='password' id='password' />
        </div>

        <button type='submit'>Submit</button>
      </form>
    </>
  )
}
