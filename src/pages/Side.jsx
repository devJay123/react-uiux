import React from 'react'
import {Stack, Button, ListGroup} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'

export default function Side() {

  const navigate=useNavigate();

  const moveLoc=()=>{
    let yn=window.confirm('MyComp1으로 이동하실래요?')
    //alert(yn)
    if(yn){
      // window.location.href='/comp1'
      navigate('/comp1')
    }
  }

  return (
    <Stack gap={2} className="col-xs-12 col-sm-10 col-md-10 col-lg-10">
        <Button variant="primary" as={Link} to="/" >Home</Button>
        <Button variant="secondary" as={Link} to="/comp1">MyComp1</Button>
        <Button variant="light" onClick={moveLoc}>Confirm</Button>
        <hr/>
        <ListGroup>
            <ListGroup.Item as={Link} to="/board?page=2&size=10&keyword=React">Board</ListGroup.Item>
            <ListGroup.Item as={Link} to="/users/5">UserDetail</ListGroup.Item>
            <ListGroup.Item as={Link} to="/life">LifeCycle</ListGroup.Item>
            <ListGroup.Item as={Link} to="/hook1">useEffect훅</ListGroup.Item>
            <ListGroup.Item as={Link} to="/clock">Clock</ListGroup.Item>
            <ListGroup.Item as={Link} to="/hook2">useRef훅</ListGroup.Item>
            <ListGroup.Item as={Link} to="/app2">propsDrill</ListGroup.Item>
            <ListGroup.Item as={Link} to="/hook3">Context Api</ListGroup.Item>
            <ListGroup.Item as={Link} to="/hook4">useContext훅</ListGroup.Item>
            <ListGroup.Item as={Link} to="/hook5">useMemo훅</ListGroup.Item>
            <ListGroup.Item as={Link} to="/hook6">useCallback훅</ListGroup.Item>
            <ListGroup.Item as={Link} to="/memo">React.memo</ListGroup.Item>
            <ListGroup.Item as={Link} to="/ajax1/7">Rest Api1 (User) </ListGroup.Item>
            <ListGroup.Item as={Link} to="/ajax2?page=1&per_page=3">Rest Api1 (UserList) </ListGroup.Item>
            <ListGroup.Item as={Link} to="/ajax3">오늘의 날씨 </ListGroup.Item>
        </ListGroup>
    </Stack>
  )
}
