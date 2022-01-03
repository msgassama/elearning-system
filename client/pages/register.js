import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Context } from '../context'
import { useRouter } from 'next/router'

const Register = () => {
  const [name, setName] = useState(process.env.NEXT_PUBLIC_name)
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_email)
  const [password, setPassword] = useState(process.env.NEXT_PUBLIC_password)
  const [loading, setLoading] = useState(false)

  // state
  const {
    state: { user },
    dispatch,
  } = useContext(Context)
  //  const { user } = state

  // router
  const router = useRouter()

  useEffect(() => {
    if (user !== null) {
      router.push('/')
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.table(name, email, password)
    try {
      setLoading(true)
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      })
      // console.log('REGISTER RESPONSE ---> ', data)
      toast.success('Regitration successful. Please login.')
      setLoading(false)
    } catch (err) {
      toast.error(err.response.data)
      setLoading(false)
    }
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
          <button
            className="btn btn-block btn-outline-primary p-2"
            disabled={!name || !email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "S'inscrire"}
          </button>
        </form>

        <p className="text-center p-3">
          Already registered?{' '}
          <Link href="/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Register
