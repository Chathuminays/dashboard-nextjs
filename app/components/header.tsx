import { FaRegBell } from "react-icons/fa";
import { IoIosArrowDown, IoIosMenu} from "react-icons/io";
import { useSidebar } from '../context/sidebarContext';

const Header = () => {

  // Using custom hook from SidebarContext to manage sidebar state
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <>
        <div className='h-20 flex items-center justify-between lg:ml-64 xl:ml-56 2xl:ml-64 px-5'>
            <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2 lg:hidden'>
                    <IoIosMenu className='w-6 h-6 cursor-pointer' onClick={toggleSidebar}/>
                </div>
                <h4 className='font-semibold text-xl xs:ml-2 lg:ml-0'>Dashboard</h4>
            </div>
            
            <div className='flex items-center gap-8 cursor-pointer'>
                <FaRegBell />
                <div className='flex items-center gap-2 cursor-pointer'>
                    <img src='/assets/profile.svg' alt="" />
                    <IoIosArrowDown />
                </div>
            </div>
        </div>
    </>
  )
}

export default Header;