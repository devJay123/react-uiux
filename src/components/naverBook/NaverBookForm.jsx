import React,{useState, useRef} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'

export default function NaverBookForm({onFind}) {
  const [search, setSearch]=useState('')
  const searchRef=useRef()

  const onChangeHandler=(e)=>{
    setSearch(e.target.value)
  }
  const onKeyUp=(e)=>{
    if(e.key==='Enter'){
      onSubmit();
    }
  }
  const onSubmit=()=>{
    //alert('submit')
    if(!search.trim()){//trim() : 문자열 앞뒤의 공백문제를 제거함
      alert('검색어를 입력하세요');
      searchRef.current.focus();
      return;
    }
    onFind(search)
    //부모 컴포넌트에 검색어를 넘기자

  }

  return (
    <Row>
      <Col md={9} className="offset-1">
          <Form.Control type="search"
          ref={searchRef}
          onChange={onChangeHandler}
          value={search}
          onKeyUp={onKeyUp}
          name="search" placeholder="검색어를 입력하세요" />
      </Col>
      <Col md={2}>
          <Button onClick={onSubmit}>검색</Button>
      </Col>
    </Row>
  )
}
