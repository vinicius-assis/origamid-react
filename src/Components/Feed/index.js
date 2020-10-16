import React, { useEffect, useState } from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';


function Feed({ user }) {
  const [modalPhoto, setModalPhoto] = useState(null)
  const [pages, setPages] = useState([1])
  const [infinite, setInfinite] = useState(true)

  useEffect(() => {
    let wait = false
    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY
        const height = document.body.offsetHeight - window.innerHeight
  
        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1])
          wait = true
          setTimeout(() => {
            wait = false
          }, 500)
        }
      }
    }


    window.addEventListener('whell', infiniteScroll)
    window.addEventListener('scroll', infiniteScroll)

    return () => {
      window.removeEventListener('whell', infiniteScroll)
      window.removeEventListener('scroll', infiniteScroll)
    }
  }, [infinite])

  return (
    <div>
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto}/>}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user} 
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
        />
      ))}
    </div>
  );
}

export default Feed;