import React,{useState} from 'react'

export default function AppPropsDrill() {//부모
    
    const [userId, setUserId]=useState('유재석')

  return (
    <div>
      <div>상단 메뉴</div>
        <h1>부모 AppPropsDrill </h1>
        <hr/>
        {/* 컨텐츠 -Profile props nick을 전달  */}
        <Profile nick={userId}/>
      <div>하단 메뉴</div>
    </div>
  )
}
function Profile({nick}){
    return (
        <div className="alert alert-success">
            <h3>MyProfile</h3>
            <p>Profile에서는 userId라는 props를 사용하지 않고 자식 
                Greeting에게 전달하는 역할만 한다
            </p>
            <Greeting nick={nick} />
        </div>
    )
}
function Greeting({nick}){
    return (
        <div className="alert alert-danger">
            <h4>저는 프런트엔드 개발자 {nick} 입니다</h4>
        </div>    
        )
}




