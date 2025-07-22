import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';


function App() {
  
  return (
    <>
    <AuthProvider>
    <ToastContainer/>
    <Navbar/>
      <main className='min-h-screen max-w-screen-2xl mx-auto px-20 py-6 font-primary'>
      <Outlet/>
      </main>
      <Footer/> 
    </AuthProvider>
     
      
    </>
  )
}

export default App
