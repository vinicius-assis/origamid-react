import React, { useEffect, useState } from 'react';
import InputForm from '../InputForm/index'
import ButtonForm from '../ButtonForm/index'
import Error from '../Helpers/Error'
import useForm from '../../Hooks/useForm'
import useFecth from '../../Hooks/useFetch'
import { PHOTO_POST } from '../../api'

import styles from './UserPhotoPost.module.css'
import { useNavigate } from 'react-router-dom';


const UserPhotoPost = () => {
  const nome = useForm()
  const peso = useForm('number')
  const idade = useForm('number')
  const [img, setImg] = useState({})
  const { data, error, loading, request } = useFecth()
  const navigate = useNavigate()

  useEffect(() => {
    if(data) navigate('/conta')
  }, [data, navigate])
  
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('img', img.raw)
    formData.append('nome', nome.value)
    formData.append('peso', peso.value)
    formData.append('idade', idade.value)
    
    const token = window.localStorage.getItem('token')
    const {url, options} = PHOTO_POST(formData, token) 
    request(url, options)
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    })
  }

  return (
      <section className={`${styles.photoPost} animeLeft`}>
        <form onSubmit={handleSubmit}>
          <InputForm label="Nome" type="text" name="nome" {...nome} />
          <InputForm label="Peso" type="text" name="peso" {...peso} />
          <InputForm label="Idade" type="text" name="idade" {...idade} />
          <input className={styles.file} type="file" name="img" id="img" onChange={handleImgChange} />
          {loading ? <ButtonForm disabled>Enviando...</ButtonForm> : <ButtonForm>Enviar</ButtonForm>}
          <Error error={error} />
        </form>
        <div>
          {img.preview && <div className={styles.preview} style={{backgroundImage: `url(${img.preview})`}}></div>}
        </div>
      </section>
    );
}

export default UserPhotoPost;