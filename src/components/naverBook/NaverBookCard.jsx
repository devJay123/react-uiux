import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function NaverBookCard(props) {
  const {isbn, title, link, image, author, discount, pubdate}=props
  let title_ellipsis =title;
  let len=25;
  if(title.length>len){//25자를 초과하면 
    title_ellipsis=title.substring(0,len)+"..."
  }
  let date=pubdate.substring(0,4)+"-"+pubdate.substring(4,6)+"-"+pubdate.substring(6)

  return (
    <Card>
      <Link to={link}>
        <Card.Img src={image}></Card.Img>
      </Link>
      <Card.Body>
          <Card.Title>
            <Link to={link} style={{textDecoration:'none'}}>
              {title_ellipsis}
            </Link>
          </Card.Title>
          <Card.Text>
              <div>가  격 : {discount} 원</div>
              <div>저  자 : {author} </div>
              <div>출판일 : {date}</div>
          </Card.Text>
      </Card.Body>
    </Card>
  )
}








