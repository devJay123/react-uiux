import React,{useState, createContext} from 'react'

const UserContext =createContext('unknown')
//UserContext안에 {Provider, Consumer}

export default function AppCtx() {
  const [userId, setUserId]=useState('손나영')
  return (
    <div>
      {/* 데이터 공급자  value에 지정된 데이터를 전역적으로 사용할 수 있게 공급한다 */}
      <UserContext.Provider value={userId}>
        <h1>Context Api 사용하기 - AppCtx(부모-Provider)</h1>
        <Profile/>
      </UserContext.Provider>
    </div>
  )
}
function Profile(){
    return (
        <div className="alert alert-primary">
            <h3>MyProfile</h3>
            <p>Context를 이용해 데이터를 전달받습니다
            </p>
            <Greeting/>
        </div>
    )
}
function Greeting(){
    return (
      <UserContext.Consumer>{(userId)=>(
        <div className="alert alert-danger">
            <h4>저는 백엔드 개발자 {userId} 입니다</h4>
        </div>    
        )}
      </UserContext.Consumer>
        )
} 