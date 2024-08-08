import React,{useEffect, useState, useRef} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {Row, Col, Form, Button} from 'react-bootstrap'
import axios from '../../lib/axiosCreate'

export default function BoardModify() {
    const [form, setForm]=useState({title:'',content:'',userid:''})

    const refTitle=useRef();
    const refContent=useRef();
    const refUserid=useRef();

    const {id} =useParams();//글번호 받기
    const navigate=useNavigate();

    useEffect(()=>{
        getBoard()
    },[id])
    //GET  /api/boards/11  ==> 11번 게시글 조회
    const getBoard=async()=>{
        const response = await axios.get('/api/boards/'+id)
        console.log('response.data: ', response.data)
        if(response.data.length===1){
            setForm(response.data[0])
        }else{
            alert('존재하지 않는 글이에요')
            navigate('/post')
        }
    }
    const {title,userid,content} =form;
    const onSubmitHandler=(e)=>{
        e.preventDefault();
        if(!title){
            alert('글 제목을 입력하세요')
            refTitle.current.focus();
            return;
        }
        if(!userid){
            alert('작성자를 입력하세요');
            refUserid.current.focus();
            return;
        }
        if(!content){
            alert('글 내용을 입력하세요')
            refContent.current.focus();
            return;
        }
        //PUT  /api/boards/11 ===> 수정처리
        requestModify()
    }
    const requestModify= async ()=>{
        try{
            const response= await axios.put(`/api/boards/${id}`, form)
            //alert(JSON.stringify(response.data))
            if(response.data.result==='success'){
                alert('글 수정 완료')
                navigate('/post')
            }else{
                alert(response.data.msg)
            }
        }catch(err){
            alert('Error: '+err.response.status)
        }
    }


    const onChangeHandler=(e)=>{
        setForm({... form, [e.target.name]: e.target.value})
    }
    const onResetHandler=()=>{
        setForm({... form, title:'', content:'', userid:''})
    }
  return (
    <div>
    <Row className="my-3">
    <Col className="p-3 mx-auto" md={8}>
        <h1 className="text-center">Board Modify</h1>
    </Col> 
    </Row>
    <Row className="my-3">
    <Col className="p-3 mx-auto" md={8}>
        <Form onSubmit={onSubmitHandler}>
            <Form.Group className="my-2">
                <Form.Label>제 목</Form.Label>
                <Form.Control type="text" name="title"
                    onChange={onChangeHandler}
                    ref={refTitle}
                    value={form.title}
                placeholder="제목을 입력하세요" />
            </Form.Group>

            <Form.Group className="my-2">
                <Form.Label>작성자</Form.Label>
                <Form.Control type="text" name="userid"
                onChange={onChangeHandler}
                ref={refUserid}
                value={form.userid}
                placeholder="작성자를 입력하세요" />
            </Form.Group>

            <Form.Group className="my-2">
                <Form.Label>글내용</Form.Label>
                <Form.Control as="textarea" rows={7} name="content"
                onChange={onChangeHandler}
                ref={refContent}
                value={form.content}
                placeholder="내용을 입력하세요" />
            </Form.Group>
            <div className="my-2 text-center">
                <Button type="submit" variant="success" className="mx-1 px-3">글 수 정</Button>
                <Button type="reset"
                    onClick={onResetHandler}
                variant="warning" className="mx-1 px-3">다시쓰기</Button>
            </div>
        </Form>
    </Col>
    </Row>
</div>
  )
}
