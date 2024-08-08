import React,{useState, useRef, useCallback} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import './TodoForm.css'
import { BsFillPencilFill } from "react-icons/bs";
import { MdOutlineRefresh } from "react-icons/md";
export default function TodoForm({onCreate}) {
    const [content, setContent] = useState('')
    const contentRef =useRef();
    const onChange =useCallback((e)=>{
            setContent(e.target.value)
    },[])
    const onKeyDown=(e)=>{
        console.log(e.keyCode)
        if(e.keyCode===13){//엔터쳤을때
            onSubmit();
        }
    }
    const onSubmit=()=>{
        // alert('+')
        //유효성 체크
        if(!content){
            alert('새로 해야할 일을 입력하세요');
            contentRef.current.focus();
            return;
        }
        //부모로부터 props로 전달받은 속성(핸들러함수)을 이용해서 
        //content를 부모에 전달한다
        onCreate(content)//부모로 부터 내려받은 onCreate()이용해서 전달

        setContent('')//초기화

    }
    const onReset=()=>{
        // alert('reset')
        setContent('');
        contentRef.current.focus();
    }
  return (
    <div>
      <h3 className="my-4">새로운 Todo추가 <BsFillPencilFill /></h3>
      <Row>
          <Col xs={12} sm={8} md={8}>
              <input name="content" ref={contentRef} className="inputCss"
               onChange={onChange} onKeyDown={onKeyDown}  value={content}/>
          </Col>
          <Col xs={12} sm={4} md={4}>
               <Button variant="outline-primary" onClick={onSubmit}> + </Button> 
               <Button variant="outline-warning" onClick={onReset}><MdOutlineRefresh /></Button> 
          </Col> 
      </Row>
    </div> 
  )
}

