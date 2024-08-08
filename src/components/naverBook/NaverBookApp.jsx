import React,{useState, useMemo} from 'react'
import {Button, Container, Row, Col} from 'react-bootstrap'
import NaverBookForm from './NaverBookForm'
import NaverBookCard from './NaverBookCard'
import axios from 'axios'

//uNoE4oh70aRiql5_dUDK
//1WnW3Jy7KB
//https://openapi.naver.com/v1/search/book.json
export default function NaverBookApp() {
  const [query, setQuery]=useState('')
  const [bookList, setBookList]=useState([])
  const [total, setTotal]=useState(0)

  const [start, setStart]=useState(1);//네이버에 요청보낼때 사용할 start 데이터
  const display=12;//한 페이지에 display할 도서개수 (12개 로지정)

  const [pageCount, setPageCount]=useState(1)//총 페이지 수 ==> total과 display를 가지고 연산하여 구한다
  const [pageNavi, setPageNavi]=useState('')
  const [currentPage, setCurrentPage]=useState(1);//현재 보여줄 페이지 번호
  const [pageRangeStart, setPageRangeStart]=useState(1)//페이징 블럭처리에서 사용할 데이w터

  /**
  page		start	display
	1		      1	  12
	2		      13	12
	3		      25	12
	4		      37	12

	start = (page-1)*display+1
   */

  const pageHandler= async (page)=>{
    //alert(page)
    setCurrentPage(page)
    //start값 연산
    let tmpStart=(page-1)*display+1;//네이버에서 가져올 시작값 구하기
    fetchData(query, tmpStart)//해당 페이지의 데이터 가져오기
  }

  //페이징 처리 관련 연산을 수행하고 페이지 네비게이션을 반환
  const getPageNavi=useMemo(()=>{
    //총 페이지수
    let pageCount=Math.ceil(total/display)
    
    setPageCount(pageCount);
    let navi=[]
    //pageRangeStart+9
    let end=Math.min(pageRangeStart+9, pageCount)

    for(let i=pageRangeStart;i<=end;i++){
      navi.push(<Button key={i} onClick={()=>{pageHandler(i)}}
         className="xs mx-1" variant={i===Number(currentPage)?'primary':'outline-primary'}>{i}</Button>)
    }//for---
    if(pageCount>end){
      navi.push(<Button key="next" 
      onClick={()=>{
        setPageRangeStart(end+1)
        pageHandler(end+1)
      }}
      variant="primary" className="xs mx-1">Next</Button>)
    }
    //pageRangeStart: 1, 11, 21 , 31 ....
    if(pageRangeStart>1){
      //navi.unshift() 배열의 맨 앞에 추가, navi.push() : 배열의 맨 뒤에 추가
      navi.unshift(<Button 
        onClick={()=>{
          setPageRangeStart(pageRangeStart-10)//이전 블럭으로 시작값 설정
          pageHandler(pageRangeStart-1)//이전 블럭의 마지막 페이지를 보여준다
        }}
        className="xs mx-1" key="prev">Prev</Button>)
    }
    
    return navi;
  },[total, currentPage])

  const onFind=async(value)=>{
    //alert(value);
    await setQuery(value)
    fetchData(value, 1)
  }

  //package.json에 "proxy":"http://localhost:5000"
  const fetchData=async(value, start)=>{
    let url=`/api/books?query=${value}&start=${start}&display=${display}`
    // alert(url)
    //axios로 get방식 요청 보내서 응답 받아 콘솔에 출력하세요
    await axios.get(url)
    .then((res)=>{
      // alert(JSON.stringify(res.data))
      const {items, total}=res.data
      setBookList(items)
      setTotal(total)    
    })
    .catch((error)=>{
      alert('Error: '+error.message)
    })


  }

  return (
    <Container>
      <h1 className="text-success text-center my-5">Naver Books</h1>
      <br/> 
      {total>0&&getPageNavi}
      <br/>
      <br/>
      <NaverBookForm onFind={onFind}/>
      {total>0 &&
        <Row>
            <Col md={10} className="mx-auto my-4">
              <h3>검색어 : 
                  <span className="text-primary">{query} </span>     
                  <span className="text-danger"> {total}개</span>     
              </h3>
              </Col>
        </Row>
      }
      <Row className="mt-4">
        {bookList&&
        bookList.map((book, i)=>(
          <Col md={3} key={i}>
            <NaverBookCard key={book.isbn}  {...book} />
          </Col>
          ))
        }
      </Row>
     
    </Container>
  )
}
