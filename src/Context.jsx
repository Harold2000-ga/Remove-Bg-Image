import { createContext, useState } from 'react'

const ImageContext = createContext({
  urlOriginal: null,
  urlModified: null,
  imageStatus: null,
})

const ImageProvider = ({ children }) => {
  const [urlOriginal, setUrlOriginal] = useState('')
  const [urlModified, setUrlModified] = useState('')
  const [imageStatus, setImageStatus] = useState('Empty')

  const contextValue = {
    urlModified,
    setUrlModified,
    urlOriginal,
    setUrlOriginal,
    imageStatus,
    setImageStatus,
  }

  return <ImageContext.Provider value={contextValue}>{children}</ImageContext.Provider>
}

export { ImageContext, ImageProvider }
