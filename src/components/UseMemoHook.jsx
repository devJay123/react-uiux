import React, {useState, useRef, useMemo} from 'react'
import {Form, Container,Button,ListGroup} from 'react-bootstrap'


export default function UseMemoHook() {
    const [name, setName]=useState('')
    const [score, setScore]=useState('')
    const [list, setList]=useState([]) //학생목록

    const nameRef=useRef(null);//input을 참조할 예정. DOM을 참조할때 주로 사용하는 훅
    const scoreRef=useRef(null);
    //평균점수 구하는 함수
    const getAvg=()=>{
        console.log("평균값 계산 중...")
        if(list.length===0) return 0;
        let sum=0;
        for(let i=0;i<list.length;i++){
            sum+=Number(list[i].score);
        }
        let avg=sum/list.length;
        return avg;
    }
    //list의 요소값들이 변경될때 평균값이 달라짐.    
    //average값이 변동되지 않으면 메모리 캐시에 해당 값을 저장했다가 재사용한다.
    //하지만 list배열에 새로운 요소가 들어오던지, 삭제되던지 한다면
    //useMemo()안의 콜백함수를 실행하여 새로운 값을 사용한다
    //input에 학생명이나 성적을 입력할때는 연산하지 않고
    //등록버튼을 누를때만 연산이 된다.
    //변수=useMemo(콜백함수,[의존성데이터])
    const average = useMemo(()=>{
        return getAvg()
    },[list])

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
        <h1>useMemo() 훅 사용- 데이터를 캐시하는 훅</h1>
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
            <h1 className="text-danger">평균점수:
             {average&&!isNaN(average)&&average }점</h1>
             {/* <h1 className="text-primary">평균점수:{getAvg()} </h1> */}

        </Form>
    </Container>
  )
}
