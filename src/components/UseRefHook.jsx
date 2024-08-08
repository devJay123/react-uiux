import React, {useState, useRef} from 'react'
import {Form, Container,Button,ListGroup} from 'react-bootstrap'
export default function UseRefHook() {
    const [name, setName]=useState('')
    const [score, setScore]=useState('')
    const [list, setList]=useState([]) //학생목록

    const nameRef=useRef(null);//input을 참조할 예정. DOM을 참조할때 주로 사용하는 훅
    const scoreRef=useRef(null);
    //평균점수 구하는 함수
    const getAvg=()=>{
        if(list.length===0) return 0;
        let sum=0;
        for(let i=0;i<list.length;i++){
            sum+=Number(list[i].score);
        }
        let avg=sum/list.length;
        return avg;
    }


    const handleSubmit=(evt)=>{
        evt.preventDefault();//submit하려는 기본 동작을 막는다.
       if(!name){
           alert('학생 이름을 입력해야 해요')
           //document.getElementById('name').focus() 
           nameRef.current.focus()//입력 포커스 주기
           return;
       }
       if(!score){
           alert('수학 점수를 입력하세요')
           scoreRef.current.focus();
           return;
       }
       if(isNaN(score)){
            alert('점수는 숫자로 입력해야 해요')
            scoreRef.current.select();//입력값을 선택함
            return;
       }
       console.log("로직 수행 예정**************")
       //list배열에 새로 등록한 학생객체 추가
       //입력필드 값 비워주기
    //    const studuent={name:name, score:score}
       const student={name, score}
       setList([...list, student])
       console.log(list)
       setName('')//초기화
       setScore('')//초기화
       nameRef.current.focus();//입력 포커스 주기
    }
  return (
    <Container>
        <h1>useRef() 훅 사용</h1>
        <hr/>
        <Form>
            <Form.Group>
                <Form.Label>학생명: </Form.Label>
                <Form.Control type="text" ref={nameRef} name="name"
                onChange={(e)=>{ setName(e.target.value) }}
                value={name}
                placeholder="Name" />
            </Form.Group>
            <Form.Group>
                <Form.Label>수학 점수: </Form.Label>
                <Form.Control type="text" ref={scoreRef}  name="score"
                onChange={(e)=>{setScore(e.target.value)}}
                value={score}
                placeholder="Scole" />
            </Form.Group>
            <br></br>
            <Button variant="success" onClick={handleSubmit}>등록</Button>
            <hr/>
            <ListGroup>
                {list.map((obj, i)=>(
                    <ListGroup.Item>
                        {obj.name}:  {obj.score} 점
                    </ListGroup.Item>
                    ))
                }
            </ListGroup>
            <br/>
            <h1 className="text-danger">평균점수: {getAvg().toFixed(2)}   점</h1>

        </Form>
    </Container>
  )
}
