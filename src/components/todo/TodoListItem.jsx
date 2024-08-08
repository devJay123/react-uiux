import React from 'react'
import './TodoListItem.css'

export default function TodoListItem(props) {
    console.log('props: ',props)
    const {id, content, wdate, isDone, onDelete, onChangeDone}=props;

    const onChangeCheckBox=()=>{
        onChangeDone(id)//id번에 해당하는 todo의 isDone값을 반대값으로 변경
    }

  return (
    <div className="TodoListItem">
        <div className="chkbox">
            <input type="checkbox" name="isDone"
                onChange={onChangeCheckBox}
             checked={isDone} />
        </div>
        <div className="content" style={{textDecoration: isDone? 'line-through':'none',
                color: isDone? 'gray':'black'  }}>
           {content}
        </div>
        <div className="wdate">
            {new Date(wdate).toLocaleDateString()}
        </div>
        <div className="btnDel">
            <button 
            onClick={()=>{
               //if(window.confirm(id+'번 할일을 정말 삭제할까요?')){//확인을 누르면 true반환
                    onDelete(id)
               // }
            }}
            className="btn btn-danger"> x </button>
        </div>
      
    </div>
  )
}

