import React,{useState, useRef, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Row,Col,Form,Button} from 'react-bootstrap'
import axios from '../../lib/axiosCreate'
/**
post /api/boards     	게시글쓰기:  
get  /api/boards      	게시목록보기:
get /api/boards/10   	10번 게시글 보기 (글상세복, 글수정폼)
put /api/boards/10       	게시글 수정
delete /api/boards/10  	10번 게시글 삭제
 */
export default function BoardForm({onMode}) {
    const navigate =useNavigate()

    const initData={
        title:'',
        content:'',
        userid:''
    }
    const [form, setForm] =useState(initData);

    const refTitle=useRef();
    const refContent=useRef();
    const refUserid=useRef();
    let uid=null;//로그인한 사람의 userid값 받을 예정
    useEffect(()=>{
        //세션스토리지에 저장된 userInfo가 있는지 꺼내보자
        let str=sessionStorage.getItem('userInfo');
        //alert(str);//string유형
        if(str!==null){
            let user=JSON.parse(str);//문자열을 parsing하여 JSON객체로 변환
            uid=user.userid;//uid에 로그인한 사람의 아이디 할당
            setForm({...form, userid:uid})
        }else{
            alert('로그인을 해야 글쓰기가 가능해요')
            navigate('/login')
        }
    },[])


    const onChangeHandler=(e)=>{
        const frmData={... form, [e.target.name]:e.target.value}
        console.log(frmData)
        setForm(frmData)
    }
    const onSubmitHandler=(e)=>{
        e.preventDefault();//axios로 요청해야 하므로, form을 submit하지 못하게 기본동작을 막는다
        const {userid,title,content} =form;
        if(!title){
            alert('제목을 입력하세요')
            refTitle.current.focus()
            return;
        }
        if(!userid){
            alert('작성자를 입력하세요')
            refUserid.current.focus()
            return;
        }
        if(!content){
            alert('글내용을 입력하세요');
            refContent.current.focus();
            return;
        }
       // for(let i=0;i<16;i++)
        requestBoardWrite()
    }
    const onResetHandler=()=>{
        setForm({...form, ...initData})
        refTitle.current.focus();
    }
    const requestBoardWrite=()=>{
        axios.post('/api/boards', form)
        .then(response=>{
            //alert(JSON.stringify(response.data))
            if(response.data.result==='success'){
                // let bno=response.data.data.no
                // alert(bno+'번 글이 생성되었어요')
                alert('글쓰기 성공')
                onMode('list')//글목록 보여주기
            }else{
                alert('글쓰기 실패')
                onResetHandler();//입력 폼 초기화
                //onMode('write')
            }
        })
        .catch(err=>{
            alert('Error: '+err.response.status)
        })
    }


  return (
    <div>
        <Row className="my-3">
        <Col className="p-3 mx-auto" md={8}>
            <h1 className="text-center">Board Write</h1>
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
                    onChange={onChangeHandler} readOnly
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
                    <Button type="submit" variant="success" className="mx-1 px-3">글 쓰 기</Button>
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
