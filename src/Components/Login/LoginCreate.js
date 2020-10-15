import React, { useContext } from 'react';
import userForm  from '../../Hooks/useForm'
import InputForm from '../InputForm';
import ButtonForm from '../ButtonForm';
import { USER_POST } from '../../api';
import { UserContext } from '../../UserContext'
import useFetch from '../../Hooks/useFetch';
import Error from '../Helpers/Error'


const LoginCreate = () => {
  const username = userForm()
  const email = userForm()
  const password = userForm()

  const { userLogin } = useContext(UserContext)
  const {loading, error, request } = useFetch()

  async function handleSubmit(event) {
    event.preventDefault()
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    })
    const { response } = await request(url, options)

    if (response.ok) userLogin(username.value, password.value)
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <InputForm label="Usuario" type="text" name="username" {...username}/>
        <InputForm label="Email" type="email" name="email" {...email} />
        <InputForm label="Senha" type="password" name="password" {...password} />
        {loading ? (<ButtonForm disabled>Cadastrando...</ButtonForm>) : (<ButtonForm>Cadastrar</ButtonForm>)}
        <Error error={error} />
      </form>
    </section>
  )
}

export default LoginCreate;