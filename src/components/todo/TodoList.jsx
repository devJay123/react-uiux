import React,{useMemo, useState} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import TodoListItem from './TodoListItem'
import './TodoList.css'
export default function TodoList({todos, onDelete, onChangeDone}) {

   const [search, setSearch]=useState('')
   const onFind=(e)=>{
       setSearch(e.target.value)//검색어 설정
   }
   //검색한 결과 (배열)를 반환하는 함수
   //모든 목록 or 검색 목록을 반환
   const getSearchResult=()=>{
       if(!search){
           return todos;
       }
       //검색어가 있다면
       //문자열 검색: 문자열.indexOf('검색어') ===> number(인덱스번호) 
       //문자열에 해당 검색어가 있으면 검색어가 있는 위치의 인덱스 번호를 반환하고
       //없으면 -1을 반환한다
       //배열, 문자열 : 문자열.includes(검색) ===> true(검색어가 있을경우),false(없을 경우)
       //toLowerCase():소문자로, toUpperCase(): 대문자로
       let searchArr=todos.filter((it)=>it.content.toLowerCase().includes(search.toLowerCase()))
       return searchArr;
   }

  const aggregate = useMemo(()=>{
      const totalCount=todos.length;//총 할 일
      const doneCount=todos.filter((it)=>(it.isDone)).length;//완료한 일의 개수
      const notDoneCount=totalCount-doneCount;
        return {totalCount, doneCount, notDoneCount}
  },[todos]) 
  const {totalCount, doneCount, notDoneCount}=aggregate;

  return (
    <div className="TodoList my-4">
      <h3>TodoList </h3>
       <br/>
        <Row>
            <Col xs={12} sm={10} md={10}>
                <div className="alert alert-success my-4">
                    <h4>ToDo 총 개수: {totalCount}  </h4>
                    <h4>완료된 일: {doneCount} 개</h4>
                    <h4>해야할 일: {notDoneCount} 개</h4>
                </div>
            </Col>
        </Row>    

       <Row>
           <Col xs={12} sm={8} md={8}>
               <input name="search" className="inputSearch"
               placeholder="검색어를 입력하세요"
               onChange={onFind} />
           </Col>
           <Col xs={12} sm={4} md={4}>
               <Button onClick={onFind}>검색</Button>
           </Col>
        </Row> 
        <Row className="mt-3 py-3">
            <Col xs={12} sm={10} md={10}>
            {/*[1] todos 의 map()함수 이용해서 TodoListItem 출력되도록 key는 todo객체의 id값 설정 */}
            {
                //todos를 getSearchResult()함수가 반환하는 배열로 수정
                getSearchResult().map((todo)=>(
                    // <TodoListItem key={todo.id} content={todo.content} wdate={todo.wdate} />
                    <TodoListItem key={todo.id} 
                     {... todo} 
                     onDelete={onDelete}
                     onChangeDone={onChangeDone}
                     />
                ))
            }
                {/*[2] TodoListItem에 props로 데이터 전달한뒤, TodoListItem에서는
                content, wdate 출력하기  */}

            </Col>
        </Row>

    </div>
  )
}


