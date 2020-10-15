import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import ButtonForm from '../ButtonForm';
import Error from '../Helpers/Error';
import InputForm from '../InputForm';

import styles from './LoginForm.module.css'
import stylesBtn from '../ButtonForm/ButtonForm.module.css'



const LoginForm = () => {
  const username = useForm()
  const password = useForm()

  const { userLogin, error, loading } = useContext(UserContext) 

  async function handleSubmit(event) {
    event.preventDefault()

    if (username.validate() && password.validate()) { 
      userLogin(username.value, password.value)
    }

  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputForm label="Usuario" type="text" name="username" {...username}/>
        <InputForm label="Password" type="password" name="password" {...password}/>
        {loading ? (<ButtonForm disabled>Carregando...</ButtonForm>) : (<ButtonForm>Entrar</ButtonForm>)}
        <Error error={error} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">Perdeu a senha?</Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda nao possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/criar">Cadastro</Link>
      </div>
    </section>
  )
}

export default LoginForm;