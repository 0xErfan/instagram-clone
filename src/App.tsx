function App() {
  const fetchLogin = async () => {
    const res = await fetch('http://localhost:3001/auth/login', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: "reza_2", password: "reza_2" })
    })
    const data = await res.json()
    document.cookie = data.token
  }
  return <div onClick={fetchLogin} className='text-center'>hi there</div>
}

export default App
