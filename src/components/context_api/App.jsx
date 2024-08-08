import React,{useState, createContext, useContext} from 'react'
//React.createContext(기본값)==>{Provider,Consumer}
const MemberContext = createContext('아무개')

export default function App() {

  const [userId, setUserId]=useState('김철수')
  return (
    <div>
      <MemberContext.Provider value={userId}>  
      <h1>useContext()훅을 사용하여 Provider가 공급하는 데이터를 사용하자</h1>
      <br/>
      아이디:
      <input type="text" name="userId" value={userId}
      onChange={(e)=>{setUserId(e.target.value)}}/>
      <br/>
      <Profile/>
      </MemberContext.Provider>
    </div>
  )
}
function Profile(){
    return (
        <div className="alert alert-warning">
            <h3>MyProfile</h3>
            <p>Context를 이용해 데이터를 전달받습니다
            </p>
            <Greeting/>
        </div>
    )
}
//useContext()훅을 이용해 Consumer가 없어도 데이터를 받아 사용할 수 있다.
function Greeting(){
    ///////////////////////////
    const userId=useContext(MemberContext)
    ///////////////////////////
    return (
      
        <div className="alert alert-danger">
            <h4>저는 풀스택 개발자 {userId}  입니다</h4>
        </div>    
        
        )
} 
