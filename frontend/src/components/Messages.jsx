import React, { useEffect } from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';


const Messages = () => {

useGetMessages();
const {messages} = useSelector(store=>store.message)
if(!messages) return;
return (
  <div className='px-4 flex-1 overflow-auto'>
    {
      messages?.map((messages) =>{
        return(
          <Message key={messages._id} message={messages}/>
        )
      })
    }
  </div>
)


  // return (
  //   <div className='px-4 flex-1 overflow-auto'>
  //   <Message/>
  //   <Message/>
  //   <Message/>
  //   <Message/> 
  //   <Message/>
  //   <Message/>
  //   </div>
  // )
  
}

export default Messages



