import { useContext } from 'react'
import { ImageContext } from '../Context'
import 'two-up-element'
import { useState, useEffect } from 'react'

export const StepEdit = () => {
  const { urlOriginal, urlModified } = useContext(ImageContext)
  const [processingImage, setProcessingImage] = useState(true)
  const [imageUrl, setImageUrl] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    if (processingImage) {
      const img = new Image()
      img.src = `${urlModified}?e_background_removal&_a=BATCr5AA0&${Math.random()}`
      img.onload = () => {
        setImageUrl(img.src)
        setProcessingImage(false)
        setRetryCount(0)
      }
      img.onerror = () => {
        if (retryCount < 20) {
          // Reintentar la carga de la imagen después de 1 segundo
          setTimeout(() => {
            setRetryCount(retryCount + 1)
            setProcessingImage(true)
          }, 1000)
        } else {
          setProcessingImage(false)
          setRetryCount(0)
        }
      }
    }
  }, [processingImage, retryCount, urlModified])

  return (
    <div>
      <two-up>
        <img src={urlOriginal} alt='Image upload' className='w-full max-h-[500px]' />

        {processingImage ? (
          <div className='flex items-center justify-end pr-12'>
            <p className='text-center text-gray-500 animate-ellipsis'>
              Processing Image <span className='animate-dots'></span>
            </p>
          </div>
        ) : (
          <img
            src={imageUrl}
            onLoad={() => setProcessingImage(false)}
            onError={() => setProcessingImage(true)}
            alt='Image upload'
            className='w-full max-h-[500px]'
          />
        )}
      </two-up>

      <a
        href={urlModified}
        target='_blank'
        rel='noreferrer'
        className='block bg-blue-400 hover:bg-blue-500 text-xl text-center w-full font-bold text-white rounded-full px-4 py-2 mt-10 transition-all duration-300'
      >
        Download image without background
      </a>
    </div>
  )
}
