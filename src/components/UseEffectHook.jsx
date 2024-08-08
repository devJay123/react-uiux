import React,{useState, useEffect} from 'react'
import {Button} from 'react-bootstrap'

export default function UseEffectHook() {
    const [count, setCount]=useState(0)
  //document.title=1+'번 클릭'
  //componentDidMount/componentDidUpdate 의 역할을 한다.
  //useEffect(콜백함수) : 마운트되고 state, props가 변경될때마다 호출됨
  useEffect(()=>{
      console.log('useEffect훅 componentDidMount : count=',count)
      document.title=count+"번 클릭"
      
      //옵션 : 함수를 반환할 수도 있다. 이 함수에서는 effect를 해제할 필요가 있을 경우 
      //        이 반환하는 함수 안에서 기술.
      return ()=>{
          //unmount될때 해야할 작업들을 기술
          console.log("Clean Up*****************")
    
      }

  },[count])
  //두 번째 매개변수로 의존성 배열을 넣어준다. 빈배열[]을 넣어주면 첫 번째 렌더링 후에만
  //useEffect 콜백함수가 실행된다

  //의존성 배열에 count를 넣어주면 [count] ==> count값이 변경될 때 마다 호출됨

  return (
    <div className="container py-4 text-center">
        <h2>useEffect훅 사용하기</h2>
        <h1>You Clikced  {count} times</h1>
        <br></br>
        <Button variant="outline-warning"
         onClick={()=>{
             setCount(count+1)
         }}>Click Me</Button>
    </div>
  )
}
