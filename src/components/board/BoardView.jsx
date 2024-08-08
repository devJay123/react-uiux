import React,{useState, useEffect} from 'react'
import {useParams,Link, useNavigate} from 'react-router-dom'
import {Row,Col,Button, Card, Container, Badge} from 'react-bootstrap'
import {AiFillHeart, AiFillDislike} from 'react-icons/ai'
import axios from '../../lib/axiosCreate'
import ReplyForm from './ReplyForm'
import ReplyList from './ReplyList'
import ReplyEditForm from './ReplyEditForm'
export default function BoardView() {
    const {id}=useParams()//게시글 번호
    const [board, setBoard]=useState()
    const [logId, setLogId]=useState('');//로그인한 사람의 userid
    const [replies, setReplies]=useState([])
    const navigate=useNavigate()
 
    //댓글 관련 state
    const [showEditModal, setShowEditModal]=useState(false)//모달창 보여주기 여부
    const [editReply, setEditReply]=useState(null)
   
    useEffect(()=>{
        const fetchData=async()=>{
            //비동기적으로 수행... 게시글 먼저 가져오고 그런뒤 댓글 가져올 예정
            await updateReadnum()//조회수 증가
            await getBoard() //게시글 가져오기
            await getReplies()//댓글 가져오기
        }
        fetchData();//호출
    },[id])

    let uid=null;//로그인한 사람의 userid값 받을 예정
    useEffect(()=>{
        //세션스토리지에 저장된 userInfo가 있는지 꺼내보자
        let str=sessionStorage.getItem('userInfo');
        //alert(str);//string유형
        if(str!==null){
            let user=JSON.parse(str);//문자열을 parsing하여 JSON객체로 변환
            uid=user.userid;//uid에 로그인한 사람의 아이디 할당     
            //alert(uid)
            setLogId(uid);    
        }
    },[])

    const onDelete=async()=>{
        let yn=window.confirm(`${id}번 글을 정말 삭제하시겠습니까?`)
        if(yn){
            await axios.delete(`/api/boards/${id}`)
            navigate('/post')//목록으로 가기
        }
    }

    const updateReadnum=()=>{
        axios.put(`/api/boardReadnum/${id}`)
        .then(response=>{
            console.log(response.data)
        })
        .catch(err=>{
            console.log('조회수 증가 실패: ',err)
        })
    }

    const getBoard=()=>{
        axios.get(`/api/boards/${id}`)
        .then(response=>{
            //alert(JSON.stringify(response.data))
            setBoard(response.data[0])
        })
        .catch(err=>{
            alert('error: '+err.message)
        })
    }

    //댓글 추가
    const addReply=async(newReply)=>{
        try{
            const response = await axios.post(`/api/boards/${id}/reply`, newReply)
            if(response.data.result==='success'){
                //댓글 목록 가져오기
                //alert('댓글 성공')    
                getReplies();    
            }
        }catch(err){
            alert('Error: '+err.response.status)
        }        
    }
    //댓글 목록
    const getReplies=async()=>{
        try{
            const response=await axios.get(`/api/boards/${id}/reply`)
            //alert(JSON.stringify(response.data))
            setReplies(response.data)

        }catch(err){
            alert('Error: '+err.response.status)
        }
    }

    const deleteReply=async (replyId)=>{
        //alert(replyId)
        const response =await axios.delete(`/api/boards/reply/${replyId}`)
        if(response.data.result==='success'){
            getReplies()
        }else{
            alert('삭제 실패')
        }
    }

    const startEditReply=(reply)=>{
        setEditReply(reply)
        setShowEditModal(true)
    }
    //editForm의 input onChange처리
    const onEditInputChange=(e)=>{
        setEditReply({...editReply, [e.target.name]:e.target.value})   
    }
    const updateReply= async (e)=>{
        e.preventDefault();
        try{
            const response=await axios.put(`/api/boards/reply/${editReply.rid}`, editReply)
            if(response.data.result==='success'){
                setShowEditModal(false);
                getReplies();
                setEditReply(null);
            }else{
                alert('수정 실패')
            }
        }catch(err){
            alert('Error: '+err.response.status)
        }
    }//-----------------------
 
  return (
    <Container className="py-3">
      <h2 className="text-center">BoardView [ No. {id}]</h2>
     {/* 로그인한 사람의 아이디(uid)와 글쓴이의 아이디(board.userid)가 같을 경우에만
     수정,삭제 버튼을 출력하자 */}
      {board&&(logId===board.userid)&&
      <div className="text-end my-2"> 
            <Link to={`/postEdit/${id}`}>
                <Button variant="success" className="mx-1">수  정</Button></Link>
           
                <Button variant="warning" onClick={onDelete}>삭  제</Button>
      </div>
      }
      {/* {logId}  //// {board&&board.userid} */}

      {board&&
      <Card>
          <Card.Body>
               <h4> No. {board.id}  {board.title} </h4> 
               <hr/>
               <div className="cArea">
                    {board.content}
                    <br/>
                    <AiFillHeart style={{color:'hotpink'}}/>
                    <AiFillDislike style={{color:'green'}}/>
                    &nbsp;&nbsp;
                    조회수:  <Badge bg="primary"> {board.readnum===null? '0':board.readnum}  </Badge>
               </div>
          </Card.Body>
          <Card.Footer>
                Created on {board.wdate}  by {board.userid}
          </Card.Footer>
      </Card>
        }
        {
            !board&&<h3 className="text-center text-danger">존재하지 않는 글입니다</h3>
        }

        <Row className="my-5">
            <Col className="px-1">
                <h3 className="mt-4">댓글 목록</h3>
                <ReplyList 
                 logId={logId}
                 replies={replies}
                 deleteReply={deleteReply}
                 startEditReply={startEditReply} 
                 />
            </Col>
        </Row>
        <Row className="my-5">
            <Col className="px-1">
                <h3 className="mt-4">댓글 추가</h3>
                <ReplyForm addReply={addReply} logId={logId}/>
            </Col>
        </Row>
        {/* 댓글 수정 모달 */}
        <Row className="my-5">
            <Col className="px-1">
                <ReplyEditForm
                 showEditModal={showEditModal}
                 editReply={editReply}
                 setShowEditModal={setShowEditModal}
                 onEditInputChange={onEditInputChange}
                 updateReply={updateReply}
                 />
            </Col>
        </Row>
    </Container>
  )
}
