import React, { useEffect, useState } from 'react';
import InputForm from '../InputForm/index'
import ButtonForm from '../ButtonForm/index'
import Error from '../Helpers/Error'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import { PASSWORD_RESET} from '../../api'
import { useNavigate } from 'react-router-dom';


const LoginPasswordReset = () => {
  const [login, setLogin] = useState('')
  const [key, setKey] = useState('')
  const password = useForm()
  const { error, loading, request } = useFetch()
  const navigate = useNavigate()


  async function handleSubmit(event) {
    event.preventDefault()
    if (password.validate()) {
      const { url , options } = PASSWORD_RESET({
        login,
        key,
        password: password.value
      })
  
      const { response } = await request(url, options)
      if (response.ok) navigate('/login')
    }
  }


  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const key = params.get('key')
    const login = params.get('login')
    if (key) setKey(key)
    if (login) setLogin(login)
  }, [])

  return (
    <div>
      <h1 className="title">Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <InputForm label="Nova Senha" type="password" name="password" {...password} />
        {loading ? <ButtonForm disabled>Resetando...</ButtonForm> : <ButtonForm>Resetar</ButtonForm>}
      </form>
      <Error error={error} />
    </div>
  )
}

export default LoginPasswordReset;