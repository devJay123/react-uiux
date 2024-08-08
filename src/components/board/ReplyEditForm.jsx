import React from 'react'
import {Modal, Form, Button} from 'react-bootstrap'

export default function ReplyEditForm(props) {

    const {showEditModal, editReply, setShowEditModal, onEditInputChange, updateReply} =props;
  return (
    <div>
      <Modal show={showEditModal} onHide={()=>{setShowEditModal(false)}}>
        <Modal.Header closeButton>
            <Modal.Title>댓글 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={updateReply}>
                <Form.Group className="mb-3">
                    <Form.Label>작성자</Form.Label>
                    <Form.Control type="text"
                     onChange={onEditInputChange}
                     value={editReply?.userid||''}
                     name="userid" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>댓글</Form.Label>
                    <Form.Control type="text"
                    onChange={onEditInputChange}
                        value={editReply?.content||''}
                    name="content" required />
                </Form.Group>
                <Button type="submit">댓글 수정</Button>
            </Form>
        </Modal.Body>    
      </Modal>
    </div>
  )
}
