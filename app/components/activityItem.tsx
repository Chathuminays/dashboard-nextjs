interface ActivityItemProps {
  img: string;  
  text: React.ReactNode;
  date: string; 
}

const ActivityItem: React.FC<ActivityItemProps> = ({ img, text, date }) => {

  return (

    <>
        <div className='flex items-start justify-start md:gap-3 py-3 border-b border-stroke'>
            <img src={img} alt="" />
            
            <div className='ml-3'>
              <p className='text-base'>{text}</p>
              <p className='text-sm text-text_grey'>{date}</p>
            </div>
        </div>
    </>

  )

}

export default ActivityItem;