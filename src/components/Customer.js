import React, { useState } from "react";
import { dbService } from "../fbase";
import { Card, Modal, Button } from "react-bootstrap";

import "../style.css";
function Customer(props) {
  const [editModal, setEditModal] = useState(false);

  const deleteCustomer = async () => {
    const deleteConfirm = window.confirm("지우시겠습니까?");
    if (deleteConfirm) {
      await dbService.doc(`customers/${props.customerObj.id}`).delete();
    }
  };
  function date(input) {
    var date = new Date(input);
    var month = date.getMonth() + 1;

    var result = date.getFullYear() + "-" + month + "-" + date.getDate();

    return result;
  }

  return (
    <>
      {props.owner ? (
        <Card
          border="dark"
          className="mr-2 ml-2 mb-2 "
          style={{ width: "15em", display: "inline-block" }}
        >
          <Card.Body>
            <Card.Title>이름:{props.customerObj.name}</Card.Title>
            <Card.Subtitle>
              고객타입: {props.customerObj.position}
            </Card.Subtitle>
            <div className="show-customer-item">
              <h6>전화번호:{props.customerObj.phone} </h6>
            </div>
            <div className="show-customer-item">
              <h6>인상착의:{props.customerObj.appearance}</h6>
            </div>
            <div className="show-customer-item">
              <h6>요구사항:{props.customerObj.demand} </h6>
            </div>
            <div className="show-customer-item">
              <h6>주소:{props.customerObj.addr}</h6>
            </div>
            <div className="show-customer-item">
              <h6>날짜:{date(props.customerObj.createdAt)}</h6>
            </div>

            <div className="show-customer-item">
              <Button className="mr-2"
                onClick={() => {
                  setEditModal(true);
                }}
              >
                수정
              </Button>

              <Button className = "btn btn-warning"onClick={deleteCustomer}>지우기</Button>
            </div>
          </Card.Body>
        </Card>
      ) : null}

      {editModal ? (
        <EditModal
          show={editModal}
          onHide={() => setEditModal(false)}
          id={props.customerObj.id}
          name={props.customerObj.name}
          phone={props.customerObj.phone}
          position={props.customerObj.position}
          appearance={props.customerObj.appearance}
          demand={props.customerObj.demand}
          addr={props.customerObj.addr}
          setEditModal={setEditModal}
        />
      ) : null}
    </>
  );
}
function EditModal(props) {
  const [editName, setEditName] = useState(props.name);
  const [editPhone, setEditPhone] = useState(props.phone);
  const [editPosition, setEditPosition] = useState(props.position);
  const [editAppearance, setEditAppearance] = useState(props.appearance);
  const [editDemand, setEditDemand] = useState(props.demand);
  const [editAddr, setEditAddr] = useState(props.addr);

  async function onSubmitEdit(e) {
    e.preventDefault();

    await dbService.doc(`customers/${props.id}`).update({
      name: editName,
      phone: editPhone,
      position: editPosition,
      appearance: editAppearance,
      demand: editDemand,
      addr: editAddr,
    });
    props.setEditModal(false);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form onSubmit={onSubmitEdit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">고객수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-customer-item">
            <h3>이름:</h3>
            <input
              type="text"
              required
              onChange={(event) => {
                setEditName(event.target.value);
              }}
              value={editName}
            />
          </div>
          <div className="add-customer-item">
            <h3>전화번호:</h3>
            <input
              type="text"
              required
              onChange={(event) => {
                setEditPhone(event.target.value);
              }}
              value={editPhone}
            />
          </div>

          <div
            className="add-customer-item"
            required
            onChange={(event) => {
              setEditPosition(event.target.value);
            }}
            value={editPosition}
          >
            <h3>고객유형:</h3>
            <input
              type="radio"
              value="임대인"
              name="position"
              checked={editPosition === "임대인" ? true : false}
            />
            <span>임대인</span>
            <input
              type="radio"
              value="임차인"
              name="position"
              checked={editPosition === "임차인" ? true : false}
            />
            <span>임차인</span>
            <input
              type="radio"
              value="매도인"
              name="position"
              checked={editPosition === "매도인" ? true : false}
            />
            <span>매도인</span>
            <input
              type="radio"
              value="매수인"
              name="position"
              checked={editPosition === "매수인" ? true : false}
            />
            <span>매수인</span>
          </div>

          <div className="add-customer-item">
            <h3>인상착의:</h3>
            <input
              type="text"
              onChange={(event) => {
                setEditAppearance(event.target.value);
              }}
              value={editAppearance}
            />
          </div>

          <div className="add-customer-item">
            <h3>요구사항:</h3>
            <input
              type="text"
              onChange={(event) => {
                setEditDemand(event.target.value);
              }}
              value={editDemand}
            />
          </div>
          <div className="add-customer-item">
            <h3>주소:</h3>
            <input
              type="text"
              onChange={(event) => {
                setEditAddr(event.target.value);
              }}
              value={editAddr}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>

          <div className="add-customer-item">
            <Button type="submit" value="고객수정">
              고객수정
            </Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default Customer;
