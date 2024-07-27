interface CompleteTodoProps {
    todo: string;
    priority: string;
    createdBy: string;
    date: string;
}
  
const CompleteTodo: React.FC<CompleteTodoProps> = ({ todo, priority, createdBy, date }) => {

 // Determine the priority class based on priority level
 let priorityClass = '';

 switch (priority) {
     case 'HIGH':
         priorityClass = 'bg-bg_red text-text_red';
         break;
     case 'MEDIUM':
         priorityClass = 'bg-bg_yellow text-text_yellow';
         break;
     case 'LOW':
         priorityClass = 'bg-bg_blue text-text_blue';
         break;
  }

  return (
    <>
        {/* Desktop View */}
        <div className='min-h-12 bg-white border-b border-stroke px-3 py-2 xs:hidden md:grid items-center grid-cols-9 md:text-sm xl:text-xs 2xl:text-sm'>
            <div className='col-span-1 relative inline-block group ml-3'>
                <img src='/assets/completed.svg' alt="" className='cursor-pointer'/>
                <div className="absolute mt-2 -left-6 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-white border border-[#EAECF0] rounded-full transition-opacity duration-300 ease-in-out">
                    <span className="text-[#20B826] text-xs p-1 m-1 rounded-full bg-[#20B826] bg-opacity-10">Completed</span>
                    <div className='w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-stroke absolute bottom-8 -translate-x-1'></div>
                </div>
            </div>

            <div className='col-span-4'>
                <p className='font-medium pr-3'>{todo}</p>
            </div>

            <div className='col-span-2 ml-2'>
                <p>{createdBy}</p>
            </div>

            <div className={`col-span-1  text-center flex items-center justify-center xl:text-[10px] md:text-xs 2xl:text-xs`}>
                <p className={`font-medium ${priorityClass} rounded-full p-2`} >{priority}</p>
            </div>

            <div className='col-span-1 text-text_grey ml-5'>
                <p>{date}</p>
            </div>
        </div>

        {/* Mobile view */}
        <div className='min-h-12 bg-white border-b border-stroke px-3 py-2 xs:grid md:hidden items-center'>
            <div className='flex items-center gap-5'>
                <img src='/assets/completed.svg' alt="" className='cursor-pointer'/>
                <div>
                    <p className=''>{todo}</p>
                </div>
            </div>

            <div className='flex items-center justify-end pr-3 mt-2 font-medium'>
                <p>{createdBy}</p>
            </div>

            <div className='flex items-center justify-between pl-10 pr-3 mt-2'>
                <div className={`text-sm text-center ${priorityClass} px-2 py-1 flex items-center justify-center rounded-full`}>
                    <p>{priority}</p>
                </div>
                <p className='text-text_grey'>{date}</p>
            </div>
        </div>
    </>
  )
}

export default CompleteTodo;