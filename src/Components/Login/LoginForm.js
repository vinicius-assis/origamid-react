import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import ButtonForm from '../ButtonForm';
import InputForm from '../InputForm';


const LoginForm = () => {
  const username = useForm('email')
  const password = useForm()
  

  function handleSubmit(e) {
    e.preventDefault()
    fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    }).then((response) => {
      console.log(response)
      return response.json()
    }).then((json) => {
      console.log(json)
    })
  }

  return (
    <section>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <InputForm label="Usuario" type="text" name="username" {...username}/>
        <InputForm label="Password" type="password" name="password" {...password}/>
        <ButtonForm>Entrar</ButtonForm>
      </form>
      <Link to="/login/criar">Cadastro</Link>
    </section>
  )
}

export default LoginForm;