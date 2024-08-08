import React, {useState, useEffect} from 'react'
import {useSearchParams} from 'react-router-dom'
import {Pagination,Spinner} from 'react-bootstrap'

// ajax2?page=1&per_page=3
//https://reqres.in/users?page=1&per_page=3

export default function ListUser() {
    
    const [userList, setUserList]=useState([])
    const [total, setTotal]=useState(0)//총 회원수 (12) /3 = 4pages
    const [totalPages, setTotalPages]=useState(1); //페이지수 = Math.ceil(total/per_page)
    const [currentPage, setCurrentPage]=useState(1);
    const [loading, setLoading]=useState(false);

    const [params]= useSearchParams()
    const perPage=Number(params.get('per_page'))
    //query string으로 전달된 파라미터값 (page, per_page) 받기
    // console.log(`params.get('page') : ${params.get('page')}`)
    // console.log(`params.get('per_page') : ${params.get('per_page')}`);

    const getAllUsers=(page, perPage)=>{
        //alert(page+"/ "+perPage)
        setLoading(true) //로딩 시작

        let url=`https://reqres.in/api/users?page=${page}&per_page=${perPage}&delay=3`
                
        fetch(url)
        .then(response=>response.json())
        .then(resData=>{
            if(!resData || !resData.data){
                alert('데이터가 없습니다')
                return;
            }
            //alert(JSON.stringify(resData))
            setLoading(false);//로딩 완료
            let tmpArr=[... resData.data]
            let tmpTotal=resData.total;
            setUserList(tmpArr);
            setTotal(tmpTotal);//총 회원수
            setTotalPages(resData.total_pages);//총 페이지 수 (4)
        })
        .catch(error => alert(error.message))
    }

    //useEffect()에서 getAllUsers()호출하기==> setUserList()로 user목록 설정
    useEffect(()=>{
        getAllUsers(1, perPage)
    },[])
    //userList의 map()이용해서 출력
    const onPageChange=(page)=>{
        //alert(page)
        setCurrentPage(page);//현재 보여줄 페이지로 설정
        //currentPage에 해당하는 데이터 받아오기
        getAllUsers(page, perPage)
    }

  return (
    <div className="container py-4">
      <h2>All Users - {total}명 </h2>
      <br/>
      <ul>
          {loading&&
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
          {userList&&userList.map((user,i)=>(
            <li key={user.id}>
                <img src={user.avatar}/><br/>
                  {user.first_name} {user.last_name}
                  <br/>
                {user.email}
            </li>
          ))
        }
      </ul>
      <div>
          <Pagination className="justify-content-center">   
          {/* totalPages길이의 배열을 생성해서 인덱스를 추출 */}
              {[... Array(totalPages).keys()].map((page)=>( //keys()는 index번호를 반환한다
                <Pagination.Item key={page+1} active={(page+1)===currentPage}
                 onClick={()=>{
                     onPageChange(page+1)
                 }} >{page+1}</Pagination.Item>
                ))
              }
          </Pagination>
      </div>
    </div>
  )
}

