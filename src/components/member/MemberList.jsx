import React,{useState, useEffect, Fragment} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import './MemberList.css'
import axios from '../../lib/axiosCreate';
//useEffect훅에서 
//fetchMemberList()호출해서 모든 회원정보 받아와
//목록에 출력하세요

const Memberlist = () => {
    const [memberList, setMemberList]=useState([])

    const navigate=useNavigate();

    useEffect(()=>{
        fetchMemberList();        
    },[])

    //DELETE /api/members/1
    const deleteMember=async(no)=>{
        //alert(no)
        const url=`/api/members/${no}`
        try{
            const response =await axios.delete(url)
            const responseData=response.data;
            //alert(JSON.stringify(responseData))
            if(responseData.result==='success'){
                //navigate('/members')
                // window.location.href='/members'
                alert('삭제 성공')
                fetchMemberList();
            }else{
                alert('삭제 실패')
            }

        }catch(err){
            alert('Error: '+err.message)
        }
    }

    const fetchMemberList=async()=>{
        const url=`/api/members`
        try{
            const response = await axios.get(url)
            const responseData=response.data;
            //alert(JSON.stringify(responseData))
            setMemberList(responseData)
        }catch(err){
            alert('Error: '+err.message)
        }
    }

    return (
        <div>
            <h2 className="text-center">모든 회원 목록</h2>
            <br/><br/>
            <ul className="MemberList">
                <li>번호</li>
                <li>이름</li>
                <li>아이디</li>
                <li>이메일</li>
                <li>등록일</li>
                <li>삭제</li>
            {memberList&&memberList.map((user, i)=>(
             <Fragment key={i}>
                <li>{user.no}</li>
                <li>{user.name}</li>
                <li>{user.userid}</li>
                <li>{user.email}</li>
                <li>{user.reg_date}</li>
                <li><Link to='#'
                 onClick={()=>{
                    deleteMember(user.no)
                 }}>삭제</Link></li>
             </Fragment>
             ))
            }

            </ul>
        </div>
    );
}

export default Memberlist;
