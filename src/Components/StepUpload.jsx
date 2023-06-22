import Dropzone from 'react-dropzone'
import { CloudinaryContext } from 'cloudinary-react'
import { useContext } from 'react'
import { ImageContext } from '../Context'
import { Cloudinary } from '@cloudinary/url-gen'
import { backgroundRemoval } from '@cloudinary/url-gen/actions/effect'

export const StepUpload = () => {
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'ddzsx0xfz',
      apiKey: '675799122658747',
      apiSecret: 'TWTRdl6Ehgeb59dA7hh8nCr4PWc',
    },
  })

  const { imageStatus, setImageStatus, setUrlOriginal, setUrlModified } = useContext(ImageContext)
  const handleDrop = acceptedFiles => {
    //Get file

    const file = acceptedFiles[0]
    //Cloudinary variables
    setImageStatus('Loading')
    const timestamp = new Date().toISOString()
    const api_key = '75799122658747'
    const upload_preset = 'ml_default'
    //Get form data and config
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', upload_preset)
    formData.append('timestamp', timestamp)
    formData.append('api_key', api_key)
    //Send to cloudinary
    fetch('https://api.cloudinary.com/v1_1/ddzsx0xfz/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setImageStatus('Ready')
        setUrlOriginal(data.url)
        const imageModified = cloudinary.image(data.public_id).effect(backgroundRemoval())
        setUrlModified(imageModified.toURL())
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <CloudinaryContext cloudName='ddzsx0xfz'>
      <Dropzone
        onDrop={handleDrop}
        maxFiles={1}
        accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className='shadow-2xl border-dashed border-gray-300 aspect-video w-full flex items-center p-5 justify-end flex-col'
          >
            <input {...getInputProps()} />
            {imageStatus == 'Empty' && (
              <>
                <p className='text-gray-400 py-4'>Or drop your image here</p>
                <button className='text-white bg-blue-500 rounded-full text-bold text-xl py-4 px-6'>
                  Upload image
                </button>
              </>
            )}
            {imageStatus == 'Loading' && (
              <p className='text-gray-500 animate-ellipsis'>
                Uploading image <span className='animate-dots'></span>
              </p>
            )}
          </div>
        )}
      </Dropzone>
    </CloudinaryContext>
  )
}
