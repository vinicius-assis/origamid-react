import React from 'react';
import { PASSWORD_LOST } from '../../api';
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForm';
import ButtonForm from '../ButtonForm';
import Error from '../Helpers/Error';
import InputForm from '../InputForm';


const LoginPasswordLost = () => {
  const login = useForm()
  const { data, loading, error, request } = useFetch()

  async function handleSubmit(event) {
    event.preventDefault()
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value, 
        url: window.location.href.replace('perdeu', 'resetar')
      })
      const { json } = await request(url, request)
    } 
  }

  return (
    <section>
      <h1 className="title">Perdeu a Senha?</h1>
      {data ? (
      <p style={{color: '#4c1'}}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <InputForm label="Email / Usuário" type="text" name="login" {...login} />
          {loading ? <ButtonForm disabled>Enviando...</ButtonForm> : <ButtonForm>Enviar Email</ButtonForm>}
        </form>
      )}
      <Error error={error} />
    </section>
  )
}

export default LoginPasswordLost;