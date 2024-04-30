import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getMessages,addMessage} from '../redux/features/chatSlice';


function ChatRoom() {
	const [user,setUser] = useState("");
	const [message,setMessage] = useState("")
    const dispatch = useDispatch();

    const {chats} = useSelector((state) => state.chatmessage)

    useEffect(()=> {
      
        const interval = setInterval(()=>{
            dispatch(getMessages());
        },2000)
    },[])

	const sendMessage = () => {
        dispatch(addMessage({user,message}))
		 
	}

    console.log(chats)

	return (
<div>
            <h2>Chat Room</h2>
            <ul>  
                {chats && chats.map((item,i) =>(
                    <li key={item._id}>
                        <strong>{item.username}</strong> {item.message}
                    </li>  
                ))}               
                              
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="Your name"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>  
       )
}

export default ChatRoom