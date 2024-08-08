import React,{useState, useEffect} from 'react'
/* 
let id=setTimeout(함수, 밀리초) : 함수를 밀리초가 지난 후 1번 호출한다
	id=setTimeout(()=>{
			window.location.href='/'
				}, 3000)
	clearTimeout(id) ==> setTimeout() 프로그램을 중지
	let id=setInterval(함수, 밀리초) : 함수를 밀리초 단위로 주기적으로 호출한다
               clearInterval(id)
*/
export default function Clock() {
    const [time, setTime]=useState(new Date())
    const [date, setDate]=useState(new Date())
    useEffect(()=>{
        const timerId=setInterval(()=>{
            setTime(new Date()) //1초마다 새로운 Date객체를 얻어와 time값으로 setting
            console.log('timer돌아감....')
        },1000)

        return ()=>{
            //이 안에서 setInterval()을 해제==> clearInterval(id)
            clearInterval(timerId)
        }

    },[])

  return (
    <div className="text-center py-5">
      <h1>Clock - 오늘은 {date.toLocaleDateString()} </h1>
      <hr/>
      <h2>현재 시각은 <span className="text-danger">{time.toLocaleTimeString()}</span> 입니다   </h2>
    </div>
  )
}

