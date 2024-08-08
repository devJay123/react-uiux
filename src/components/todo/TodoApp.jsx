import React,{useState, useRef, useCallback} from 'react'
import { dummyData } from './data'
import TodoHeader from './TodoHeader'
import TodoForm from './TodoForm'
import TodoList from './TodoList' 

export default function TodoApp() {
    const[todos, setTodos]=useState(dummyData);//todos : 배열
    const idRef = useRef(dummyData.length+1);//4
    console.log('idRef.current: ',idRef.current)

    const onCreate=useCallback((content)=>{
        
        let newItem={         
            ... todos,   
            id: idRef.current,
            content:content,
            wdate:new Date().getTime(),
            isDone:false
        }
        console.log('newItem: ',newItem);
        setTodos([ ... todos, newItem])
        // setTodos([newItem, ...todos])
        //idRef.current를 id값으로 활용 중
        idRef.current+=1;//1씩 증가
    },[idRef.current, todos])

    const onDelete=useCallback((delId)=>{
        // alert(delId)
        //삭제 처리 => filter()이용해서
        let tmpArr=todos.filter((it)=>(it.id !== delId))
        setTodos(tmpArr)
    },[todos])

    const onChangeDone=(editId)=>{
        // alert(editId)
        let tmpArr=todos.map((it)=>(
            it.id===editId? {...it,isDone:!it.isDone}  :  it
        ))
        console.log(tmpArr)
        setTodos(tmpArr)    
    }

  return (
    <div>
      <TodoHeader/>
      <TodoForm onCreate={onCreate} />
      <TodoList  todos={todos} onDelete={onDelete} onChangeDone={onChangeDone} />
      {/* todos를 props로 TodoList에 전달하자 */}
    </div>
  )
}
