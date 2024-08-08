import React,{useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Figure} from 'react-bootstrap'
///ajax1/7
//http://reqres.in/api/users/1

export default function SingleUser() {
    const {id} =useParams()
    const [user, setUser] =useState(null)

    //fetch()이용해서 get방식으로 요청을 보내보자.
    const getUserInfo=()=>{
        let url=`http://reqres.in/api/users/${id}`
        console.log('url: ', url)
        fetch(url)
        .then(response => response.json())
        .then(resData=>{
            // console.log(resData)
            if(!resData.data){
                alert('해당 회원정보는 없습니다')
                return;
            }
            //user state변경
            setUser(resData.data)    
        })
        .catch(error=>{
            alert(error.message)
            console.error(error)
        })
    }
    useEffect(()=>{
        getUserInfo()
    }, [id])
    // 의존성 배열에 id를 넣어주자. id가 변경될 때마다 getUserInfo()함수를
    // 호출해서 새로운 사용자 정보를 가져오기 위함이다
    
  return (
      
    <div>
      <h1>회원 정보</h1>
      {user!=null &&
      <>
        <Figure>
            <Figure.Image src={user.avatar}  width={170} height={180} alt="user image"/>
            <Figure.Caption>
                {user.first_name}  {user.last_name}
            </Figure.Caption>
        </Figure>
            <h3>Id:  {id}  </h3>
            <h3>Name: {user.first_name}  {user.last_name} </h3>
            <h3>Email: {user.email} </h3>
       </> 
      }
    </div>
  )
}
