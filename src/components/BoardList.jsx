import React from 'react'
import {useSearchParams} from 'react-router-dom'
// useSearchParams훅은 URL의 query string을 읽고 수정하는데 사용되는 훅이다
// useSearchParams() 가 반환하는 배열(2차원배열)은 URLSearchParams객체를 스프레드 연산자로
//                  배열로 변환한 것이기 때문에 URLSearchParams객체가 가지고 있는 메서드
//                  get(), set() 등을 이용할 수 있다.
//board?page=2&size=10&keyword=React ==> useSearchParams() 이용
//users/5 ===> useParams()이용
export default function BoardList() {
    const [params]=useSearchParams();//URLSearchParams객체를 반환
    console.log(params.size)
    //[[page,2],[size,10], [keyword,'React']]
    const search =[... params];
    console.log(search)

  return (
    <div className="container py-4 text-center">
        <h2>Board List</h2>
        {
            search.map((s, i)=>(
                <h3 key={i}>파라미터명:{s[0]}   , 파라미터값: {s[1]}</h3>
            ))
        }
        <hr/>

        <br></br>
        <h3>page: {params.get('page')} </h3>
        <h3>size: {params.get('size')} </h3>
        <h3>keyword: {params.get('keyword')} </h3>
    </div>
  )
}
