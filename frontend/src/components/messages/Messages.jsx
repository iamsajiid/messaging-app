import React, { useRef, useEffect } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../../skeleton/MessageSkeleton'

function Messages() {
  const {loading, messages} = useGetMessages()
  const lastMessageRef = useRef(null)

  useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  return (
    <div className='p-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 && messages.map((text) => (
        <div key={text._id} ref={lastMessageRef}>
          <Message chat={text}/>
        </div>
      ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
    </div>
    
  )
}

export default Messages