import React,{useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
// useParams 훅은 URL경로에서 동적인 세그먼트를 가져오는데 사용된다.
//ex) /users/:id  와 같은 경로에서 :id 부분은 동적인 파라미터로 간주된다
// useParams를 사용하면 이같은 파라미터를 쉽게 가져올 수 있다.
import {userData} from '../data/userData'

export default function UserDetail() {
    const {id} = useParams();
    const [user, setUser]=useState({id:'',name:'',userId:'', addr:''})
  
   //useEffect(callback,[의존성배열]): 컴포넌트가 마운트/update/언마운트 될때 호출
   useEffect(()=>{       
       //userData배열을 돌면서 id값에 해당하는 객체를 찾아
       //setUser(findUser)
       let findUser={}
       //for루프이용해서 userData에 저장된 객체를 꺼내서 해당 객체의 id와 
       //파라미터로 넘어온 id가 동일한 객체가 있는지 찾아보자
       if(userData){
            findUser=userData.find((user)=>user.id ===Number(id))
            // for(let i=0;i<userData.length;i++){
            //     let obj=userData[i];
            //     if(obj.id === Number(id)){
            //         findUser=obj;
            //         break;
            //     }
            // }
            setUser(findUser)
        }

   }, [id])

  return (
    <div className="container py-4">
      <h1>UserDetail [{id}  번 회원정보] </h1>
    {user&&user.userId&&
      <div className="alert alert-primary my-4">
            <h2>MyPage</h2>
            <h3>Name:  {user.name} </h3>
            <h3>User ID : {user.userId} </h3>
            <h3>Address : {user.addr} </h3>
      </div>
    } 
    {(!user||!user.userId)&&
        <div className="alert alert-danger my-4">
           <h3>{id}번 회원 정보는 없습니다.</h3>
        </div>  
    }
        </div>
  )
}
