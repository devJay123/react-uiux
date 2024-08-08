import React from 'react'
// npm install --save react-icons 설치한 후 import해서 사용
import { BiCalendarHeart } from "react-icons/bi";
export default function TodoHeader() {
  return (
    <div className="container py-4">
      <h1 className="text-secondary">오늘 할 일 (To Do List)</h1>
      <h2 className="text-success">
          <BiCalendarHeart/>
          {new Date().toLocaleDateString()}</h2>
    </div>
  )
}
