import { useContext } from 'react'
import { StepUpload } from './Components/StepUpload'
import { ImageContext } from './Context'
import { StepEdit } from './Components/StepEdit'

function App() {
  const { imageStatus } = useContext(ImageContext)
  return (
    <>
      <div className='max-w-xl m-auto grid grid-cols-1 place-content-center w-full h-screen'>
        <header className='mb-10'>
          <h1 className='text-2xl text-center font-medium  text-blue-500'>Remove bg</h1>
        </header>
        <main className='w-full block'>
          {(imageStatus == 'Empty' || imageStatus == 'Loading') && <StepUpload />}
          {imageStatus == 'Ready' && <StepEdit />}
        </main>

        <footer className='flex justify-center items-center gap-x-2 font-medium pt-10'>
          <p> Make with </p>
          <a href='https://cloudinary' target='_blank' rel='noreferrer'>
            <p className='text-blue-500  text-xl font-semibold'>Cloudinary</p>
          </a>
        </footer>
      </div>
    </>
  )
}

export default App
