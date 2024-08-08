import React,{useState} from 'react';
import BoardNavi from './BoardNavi'
import BoardForm from './BoardForm'
import BoardList from './BoardList'
const BoardApp = () => {
    const [mode, setMode]=useState('list')

    //전달된 값으로 모드값 설정
    const onChangeMode=(value)=>{
        setMode(value)//'list;,'write'
    }

    return (
        <div>
            <BoardNavi onMode={onChangeMode} />
            {
                (mode==='list')&&<BoardList/>
            }
            {
                (mode==='write')&&<BoardForm  onMode={onChangeMode}/>
            }
        </div>
    );
}
export default BoardApp; 
