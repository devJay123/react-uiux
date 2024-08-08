import React,{useState, useCallback} from 'react'
import {Button} from 'react-bootstrap'
export default function UseCallbackHook() {
    const [count, setCount]=useState(0)
    
  const handleClick1=useCallback(()=>{
      console.log('handleClick1()')
    //   setCount(count+1)
    setCount(current=>(current+1))
  },[])
  //자식컴포넌트에 전달되는 handleClick2 콜백함수를 메모이제이션 한다.
  const handleClick2=useCallback( ()=>{
    console.log('handleClick2()')
      setCount(current=>(current+1))
    }, []
  )

  return (
    <div className="container py-4 text-center">
      <h1>useCallback훅 사용-콜백함수를 캐시한다</h1>        
        <hr/>
        <h2 className="text-danger">Count: {count} </h2>
        <hr/>
        <ChildComp handleClick1={handleClick1}   handleClick2={handleClick2}/>
    </div>
  )
}
function ChildComp({handleClick1, handleClick2}){
    return (
        <div>
            <h3>ChildComp</h3>
            
            <Button variant="success" onClick={handleClick1}>Increment1 (+1) </Button>
            <Button variant="danger" onClick={handleClick2}>Increment2 (+5)</Button>
        </div>
    )
}
