import React from 'react';
import {Link} from 'react-router-dom'
const BoardNavi = ({onMode}) => {
    return (
        <ul className="nav mt-3 justify-content-center">
             <li className="nav-item">
                 <Link onClick={()=>{onMode('list')}}
                  className="nav-link bg-dark text-white" to="#">List</Link>
              </li> 
              <li className="nav-item">
                 <Link  onClick={()=>{onMode('write')}}
                 className="nav-link bg-dark text-white" to="#">Write</Link>
               </li>
        </ul>
    );
}

export default BoardNavi;
