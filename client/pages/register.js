import { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState(process.env.NEXT_PUBLIC_name)
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_email)
  const [password, setPassword] = useState(process.env.NEXT_PUBLIC_password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.table(name, email, password)
    const { data } = await axios.post('http://localhost:8000/api/register', {
      name,
      email,
      password,
    })
    console.log(`REGISTER RESPONSE ---> ${data}`)
  }
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Inscription</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Entrer votre Nom complet"
          />
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrer votre email"
          />
          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrer votre mot de passe"
          />
          <button className="btn btn-block btn-outline-primary p-2">
            S'inscrire
          </button>
        </form>
      </div>
    </>
  )
}

export default Register
