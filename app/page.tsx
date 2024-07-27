'use client';
import React, { useEffect, useState } from 'react';
import { SidebarProvider } from './context/sidebarContext';
import { IoMdClose, IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";
import SideBar from "./components/sidebar";
import Header from "./components/header";
import ContentBox from './components/contentBox';
import CompleteTodo from './components/completedTodo';
import InProgressTodo from './components/inProgressTodo';
import BarChart from './components/barChart';
import ActivityItem from './components/activityItem';

interface Todo{
  id: string,
  createdBy: string,
  priority: string,
  todo: string,
  completed: boolean,
  createdAt: string
}

export default function Home() {

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const todosPerPage: number = 8;

  const handleClose = (): void => {
    setIsVisible(false)
  }

  useEffect(() => {
    const fetchTodos = async () => {
      try{
        const response = await fetch('https://6363c8f68a3337d9a2e7d805.mockapi.io/api/to-do')
        const data = await response.json()
        setTodos(data)

      }catch(error){
        console.log(error)
      }
    };

    fetchTodos();
  }, []);

  const formatDate = (isoDate:string): string => {
    const date = new Date(isoDate)
    return date.toLocaleDateString('en-us', {month: 'short', day:'numeric'});
  }

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber:number): void => {
    setCurrentPage(pageNumber);
  }

  const totalPages: number = Math.ceil(todos.length / todosPerPage);

  const getPageNumbers = (): number[] => {
    const maxPageNumbersToShow = 3;
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = startPage + maxPageNumbersToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
    }

    const pageNumbers: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const calculatePriorityCounts = (): { lowCount: number, mediumCount: number, highCount: number } => {
    let lowCount = 0;
    let mediumCount = 0;
    let highCount = 0;

    todos.forEach(todo => {
      switch (todo.priority) {
        case 'LOW':
          lowCount++;
          break;
        case 'MEDIUM':
          mediumCount++;
          break;
        case 'HIGH':
          highCount++;
          break;
        default:
          break;
      }
    });

    return { lowCount, mediumCount, highCount };
  };

  const { lowCount, mediumCount, highCount } = calculatePriorityCounts();

  return (
    <>
      <SidebarProvider>

        <SideBar/>
        <Header/>
        
      </SidebarProvider>
      

      <div className='bg-background lg:ml-64 xl:ml-56 2xl:ml-64 h-full xs:px-5 xl:px-2 2xl:px-5 py-5'>
        {/* Welcome Message */}
        {isVisible && (
            <div className='bg-white border border-stroke px-5 py-4 relative rounded-lg mb-5'>
                <h3 className='font-semibold xs:text-2xl xl:text-xl 2xl:text-2xl mb-1'>Welcome back, John Doe</h3>
                <p className='text-text_grey xl:text-sm 2xl:text-base mb-1'>The end of the year is coming. Are you planning your performance interviews? You can do this super efficiently with Acmy.</p>
                <a href="" className='text-text_pink underline xl:text-sm'>Look here for more information</a>
                <img src="/assets/design.svg" alt="" className='absolute top-0 xs:right-0 sm:right-5 md:right-20 object-contain h-full'/>
                <IoMdClose className='absolute xs:top-2 xs:right-2 md:top-4 md:right-5 text-text_gray hover:cursor-pointer' onClick={handleClose}/>
            </div>
        )}

        <div className='grid grid-cols-5'>

          <div className='xs:col-span-5 xl:col-span-3 pb-2 xl:pr-0 2xl:pr-3'>

            <ContentBox title="Tasks">

              <div className='h-12 bg-bg_grey border-b border-stroke xs:hidden md:grid grid-cols-9 items-center px-3 text-xs font-medium'>
                  <div className='col-span-1'>
                    <p>Status</p>
                  </div>
                  <div className='col-span-4'>
                    <p>Task Name</p>
                  </div>
                  <div className='col-span-2'>
                    <p className='ml-3'>Created by</p>
                  </div>
                  <div className='col-span-1 ml-2'>
                    <p>Priority</p>
                  </div>
                  <div className='col-span-1 ml-5'>
                    <p>Date</p>
                  </div>
              </div>

              <div className='h-[450px] overflow-y-auto'>
                  {currentTodos.map(todo => (
                    todo.completed ? (
                      <CompleteTodo
                      key={todo.id}
                      priority={todo.priority}
                      todo={todo.todo}
                      createdBy={todo.createdBy}
                      date={formatDate(todo.createdAt)}
                      />
                    ) : (
                      <InProgressTodo
                      key={todo.id}
                      priority={todo.priority}
                      todo={todo.todo}
                      createdBy={todo.createdBy}
                      date={formatDate(todo.createdAt)}
                      />
                    )
                  ))}
              </div>

              <div className='flex justify-center mt-2 pb-2'>
                  <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  className={`bg-white border border-[#EFEFEF] rounded-md px-2 py-1 mr-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={currentPage === 1}
                  >
                  <IoIosArrowBack />
                  </button>
                  {getPageNumbers().map(pageNumber => (
                      <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`bg-white border border-[#EFEFEF] rounded-md px-3 py-1 mx-1 ${currentPage === pageNumber ? 'bg-white text-text_pink border-text_pink' : ''}`}
                      >
                      {pageNumber}
                      </button>
                  ))}
                  <button
                      onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : currentPage)}
                      className={`bg-white border border-[#EFEFEF] rounded-md px-2 py-1 ml-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={currentPage === totalPages}
                  >
                      <IoIosArrowForward />
                  </button>
              </div>

            </ContentBox>
          </div>

          <div className='xs:col-span-5 xl:col-span-2 pb-2 xl:pl-2 xs:mt-5 xl:mt-0'>

            {/* Creating a ContentBox Component for display Bar Chart with taks priorities. */}
            <ContentBox title="Tasks Priorities">
                  <BarChart lowCount={lowCount} mediumCount={mediumCount} highCount={highCount}/>
            </ContentBox>

            <div className='xs:my-5 xl:my-3 2xl:my-2'></div>

            <ContentBox title="Activity Feed">
              <div className='xs:h-[300px] xl:h-[280px] 2xl:h-[245px] px-3 overflow-y-auto'>
                <ActivityItem
                  img="/assets/pro1.png" 
                  text={
                    <>
                      <span className='font-semibold'>Kushantha Charuka</span> created <span className='text-text_pink'>Contract #00124 need John Beige’s signature</span>
                    </>
                  }
                  date={'Sep 16, 2022 at 11:45 AM'}
                />
                <ActivityItem
                  img="/assets/pro2.png" 
                  text={
                    <>
                      <span className="font-semibold">Kumari Liyanage</span>  submitted the final report for  <span className="text-text_pink">Review #00789</span>.
                    </>
                  }
                  date={'Sep 16, 2022 at 11:45 AM'}
                />
                <ActivityItem
                  img="/assets/pro3.png" 
                  text={
                    <>
                      <span className="font-semibold">Nimal Perera</span> created <span className="text-text_pink">Contract #00124 </span>and sent it for review.
                    </>
                  }
                  date={'Sep 16, 2022 at 11:45 AM'}
                    
                />
                <ActivityItem
                  img="/assets/pro4.png"  
                  text={
                    <>
                      <span className="font-semibold">Saman Kumara</span> approved the proposal for <span className="text-text_pink">Project #00345. </span>The project is scheduled to start next week.
                    </>
                  }
                  date={'Sep 16, 2022 at 11:45 AM'}
                      
                />
                <ActivityItem
                img="/assets/pro5.png" 
                text={
                  <>
                    Assigned <span className="text-text_pink">Task #00456 </span> to <span className='font-medium'> Ananda Rajapaksa</span>. Develop new features for upcoming software release.
                  </>
                }
                date={'Sep 16, 2022 at 11:45 AM'}
                />
              </div>  
            </ContentBox>

          </div>

        </div>
      </div>

    </>
  );
}
