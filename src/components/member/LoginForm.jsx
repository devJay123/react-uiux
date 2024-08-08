import React,{useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Row,Col,Form,Button} from 'react-bootstrap'
import axios from '../../lib/axiosCreate'
import {useLoginUser} from './LoginUserContext'


const Loginform = () => {
    const navigate=useNavigate();
    const idRef=useRef()
    const passwdRef=useRef()
    const [loginUser, setLoginUser]=useState({userid:'',passwd:''})

    //로그인 처리 위해 useLoginUser로 부터 loginAuthUser함수 받아오자
    //////////////////////////////////
    const {loginAuthUser}=useLoginUser();
    //////////////////////////////////////
    const onSubmit=(e)=>{
        e.preventDefault()
        if(!loginUser.userid){
            alert('아이디를 입력하세요');
            idRef.current.focus();
            return;
        }
        if(!loginUser.passwd){
            alert('비밀번호를 입력하세요')
            passwdRef.current.focus()
            return;
        }
        //로그인 요청을 보내자
        requestLogin()        
    }
    const requestLogin=()=>{
        axios.post('/api/login', loginUser)
        .then((response=>{
            //alert(JSON.stringify(response.data))
            const res = response.data;
            if(res && res.result==='success'){
                //로그인 성공
                const authUser=res.data;
                ///////////////////
                loginAuthUser(authUser);//인증받은 회원의 no,name,userid 를 전달
                ///////////////////
                console.log('authUser: ',authUser)
                alert(res.msg)//환영 메시지
                //navigate('/')//홈페이지로 이동  Context사용시 (새로고침시 인증받은 사용자 정보 날라감)
                //이를 해결하기 위해 sessionStorage에 인증받은 사용자 정보를 저장하자.
                //sessionStorage는 웹브라우저 사용하는 동안 저장한 정보를 유지한다
                //브라우저를 닫으면 저장한 정보는 날라간다
                sessionStorage.setItem('userInfo', JSON.stringify(authUser))
                //window.location.href='/';//새로고침
                navigate('/')
            }else{
                sessionStorage.clear();//세션 스토리지 크리어 (저장한 모든 정보 삭제됨)
                sessionStorage.removeItem('userInfo')//userInfo 에 해당하는 값만 삭제
                //실패
                alert(res.msg)
                setLoginUser({...loginUser, userid:'', passwd:''})
            }
        }))
        .catch(err=>{
            sessionStorage.clear();
            alert('Error: '+err.response.status)//404
        })
    }

    const onChangeInput=(e)=>{
        const {name, value}=e.target;
        setLoginUser({... loginUser, [name]:value })
        console.log('loginUser: ', loginUser)
    }
    return (
        <div>
            <Row className="my-5 LoginForm">
                <Col className="p-5 mx-auto" xs={10} sm={10} md={6}>
                <h2 className="text-center my-4">Login</h2>
                <Form method="post" onSubmit={onSubmit}>
                    <Form.Group className="my-2">
                        <Form.Label htmlFor="userid">ID</Form.Label>
                        <Form.Control type="text" 
                        name="userid" id="userid"
                        onChange={onChangeInput}
                        value={loginUser.userid}
                        placeholder="ID" ref={idRef} />
                    </Form.Group>

                    <Form.Group className="my-2">
                        <Form.Label htmlFor="passwd">Password</Form.Label>
                        <Form.Control type="password" 
                        name="passwd" id="passwd"
                        onChange={onChangeInput}
                        value={loginUser.passwd}
                        placeholder="Password" ref={passwdRef} />
                    </Form.Group>
                    <div className="d-grid gap-2 my-3">
                        <Button type="submit" variant="success">Login</Button>
                    </div>
                </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Loginform;
