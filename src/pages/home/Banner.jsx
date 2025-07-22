import { Link } from 'react-router-dom'
import bannerImg from '../../assets/banner.png'
const Banner = () => {
  return (
    <>
    <div className='flex flex-col md:flex-row py-16 items-center justify-between gap-12'>
        {/* left text  */}
        <div className='md:w-1/2 w-full order-2 md:order-1'>
            <h1 className="md:text-5xl text-2xl font-medium mb-7">New Releases This Week</h1>
            <p className='mb-10'>It&apos;s time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this wee&apos;s new releases offer something for everyone</p>
            <Link to="/login">
            <button className="btn-primary text-white">Subscribe</button>
            </Link>
        </div>

        {/* banner right images  */}
        <div className='md:w-1/2 w-full flex items-center md:justify-end md:order-3'>
            <img src={bannerImg} alt="banner image" />
        </div>

    </div>
    </>
  )
}

export default Banner