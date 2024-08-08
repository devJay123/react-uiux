import React from 'react'
import {useState, useCallback, memo} from 'react'
export default function ReactMemo() {
    const [count, setCount] = useState(0)
    const [value, setValue] = useState(0)

  return (
    <div className="container py-4 text-center">
      <h1>React.memo()를 이용한 최적화</h1>
      <hr/>
      <h2>Count: {count}</h2>
      <h2>Value: {value}</h2>

      <hr/>
      <button onClick={useCallback(()=>{   
          setCount(current=>current+1)
      },[])}
       className="btn btn-secondary mx-1">Count를 증가</button>
      <button onClick={useCallback(()=>{
          setValue(current=>current+1)
      },[])}
       className="btn btn-success">Value를 증가</button>
      <hr/>
      <ChildComp  value={value} />
    </div>
  )
}
//props데이터(value)가 변경될때 재렌더링을 한다
//부모의 count 변경시에는 변동 없음
//React.memo()로 감싸진 컴포넌트는 부모로 부터 전달받는 props가
//변경될 때만 재렌더링
//그와 상관없는 부모 데이터 변경시에는 렌더링을 수행하지 않는다
const ChildComp=memo((props)=>{
    const {value}=props
    console.log('Rendering Child Comp....')
    return (
        <div className="alert alert-warning">
            <h1>Child Comp</h1>
            <br/>
            <h2>Value: {value} </h2>
        </div>
    )
}
)
