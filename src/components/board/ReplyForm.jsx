import React,{useState,useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from '../../lib/axiosCreate'
//댓글쓰기 :    post  /api/boards/10/reply
//댓글 리스트:  get   /api/boards/10/reply
//댓글 수정폼 :   get   /api/boards/10/reply/1
//댓글 수정처리: put   /api/boards/10/reply/1
//댓글 삭제처리: delete /api/boards/reply/1

export default function ReplyForm({addReply, logId}) {
    //props로 부모 컴포넌트의 addReply를 받자
    const [reply, setReply]=useState({userid:'', content:''})

    useEffect(()=>{
      if(logId){
        setReply({...reply, userid:logId})
      }
    },[logId])

    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        if(!reply.userid){
          alert('로그인을 해야 댓글을 쓸 수 있어요')
          setReply({userid:'', content:''})
          return;
        }
        await addReply(reply)
        setReply({...reply, content:''})
    }  
    const onChangeHandler=(e)=>{
        setReply({...reply,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3">
                <Form.Label>작성자</Form.Label>
                <Form.Control type="text"
                    readOnly
                    onChange={onChangeHandler}
                    value={reply.userid}
                name="userid" required></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
                <Form.Label>댓  글</Form.Label>
                <Form.Control as="textarea" rows="3"
                 onChange={onChangeHandler}
                 value={reply.content}
                name="content" required></Form.Control>
          </Form.Group>
          <Button type="submit">댓글 추가</Button>
      </Form>
    </div>
  )
}
