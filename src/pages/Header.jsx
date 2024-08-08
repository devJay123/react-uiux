import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
import { useLoginUser } from '../components/member/LoginUserContext'

export default function Header() { 
    const {user, logoutUser, loginAuthUser}=useLoginUser();
    const [userInfo, setUserInfo]=useState(null)//사용자 정보 담을 state
    //새로고침시 로그인한 사용자 정보를 유지하기 위해 useEffect훅에서
    //컨텍스트로부터 제공받은 user가 없다면, 세션 스토리지에서
    //로그인한 userInfo를 받아, 컨텍스트 loginAuthUser()함수에 전달하자
    useEffect(()=>{
        if(!user){
            const tmpUserInfo=sessionStorage.getItem('userInfo')
            if(tmpUserInfo){//세션스토리지에 저장된 userInfo가 있을 경우
                console.log('tmpUserInfo: ',tmpUserInfo, typeof tmpUserInfo)//string
                //json형태의 string을 json객체로 변환해주는 함수: JSON.parse(문자열)==>json객체 반환
                setUserInfo(JSON.parse(tmpUserInfo))
                loginAuthUser(JSON.parse(tmpUserInfo))
            }
        }
    },[])
    //Context로 부터 user,logoutUser를 받아온다
    const onLogout=()=>{
        logoutUser();//로그아웃 처리 Provider가 공급하는 user를 null로 초기화함
        sessionStorage.clear();
        sessionStorage.removeItem('userInfo')
        setUserInfo(null)
        window.location.href='/'
    }
  return (
    <div className="header">
      <ul>
          <li>
              <Link to="/">Home</Link>              
          </li>
          {!user&&
          <>
            <li>
                <Link to="/signup">SignUp</Link>              
            </li>
            <li>
                <Link to="/login">Login</Link>              
            </li>
          </>
          }
          {user&&
            <>
                <li className="bg-warning">
                    <Link to="#">&nbsp;&nbsp;&nbsp;{user.userid}님 로그인 중... </Link>              
                </li>
                <li>
                    <Link to="#" onClick={onLogout}>Logout</Link>              
                </li>
            </>
          }
          <li>
              <Link to="/comp1">MyComp1</Link>              
          </li>
          <li>
              <Link to="/todo">ToDo</Link>              
          </li>
          <li>
              <Link to="/naver">Naver Book</Link>              
          </li>
          <li>
              <Link to="/members">Members</Link>              
          </li>
          <li>
              <Link to="/post">Post (Board)</Link>              
          </li>
      </ul>
    </div>
  )
}
