import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { authService, dbService } from "../fbase";
import Customer from "../components/Customer";

function Home(props) {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [position, setPosition] = useState(null);
  const [appearance, setAppearance] = useState("");
  const [demand, setDemand] = useState("");
  const [addr, setAddr] = useState(null);
  const [customers, setCustomers] = useState([]);

  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const addCustomer = async () => {
    await dbService.collection("customers").add({
      name: name,
      phone: phone,
      position: position,
      appearance: appearance,
      demand: demand,
      addr: addr,
      createdAt: Date.now(),
      ownerId: props.userObj.uid,
    });

    setName("");
    setPhone("");
    setPosition("");
    setAppearance("");
    setDemand("");
    setAddr("");
  };
  const orderName = () =>{
    dbService
    .collection("customers").orderBy("name", "asc")
    .onSnapshot((snapshot) => {
      const customerArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customerArray);
    });
  }
  const orderDate = () =>{
    dbService
    .collection("customers").orderBy("createdAt", "asc")
    .onSnapshot((snapshot) => {
      const customerArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customerArray);
    });
  }
  const orderType = () =>{
    dbService
    .collection("customers").orderBy("position", "asc")
    .onSnapshot((snapshot) => {
      const customerArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customerArray);
    });
  }
 
 

  useEffect(() => {
    //function to make it real time
   
    dbService
      .collection("customers")
      .onSnapshot((snapshot) => {
        const customerArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customerArray);
      });
  }, []);

  //have to make show customer and probably have to toss curUser information and also put that in the DB
  // so that you will be able to pull the data that only curUser created.

  return (
    <>
      <button
        onClick={() => {
          setAddCustomerModal(true);
        }}
      >
        고객등록하기
      </button>
      <button onClick={orderName}>이름순</button>
      <button onClick={orderDate}>날짜순</button>
      <button onClick={orderType}>고객타입순</button>
      <AddCustomerPage
        setName={setName}
        setPhone={setPhone}
        setPosition={setPosition}
        setAppearance={setAppearance}
        setDemand={setDemand}
        setAddr={setAddr}
        addCustomer={addCustomer}
        show={addCustomerModal}
        onHide={() => setAddCustomerModal(false)}
      />

      {customers.map(
        (cus) => (
          <Customer
            key={cus.id}
            customerObj={cus}
            owner={cus.ownerId === authService.currentUser.uid}
          />
        ) //shows only someone who you created
      )}
    </>
  );
}

function AddCustomerPage(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    
      <form onSubmit={props.addCustomer}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">고객등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-customer-item">
            <h3>이름:</h3>
            <input
              type="text"
              required
              onChange={(event) => {
                props.setName(event.target.value);
              }}
            />
          </div>
          <div className="add-customer-item">
            <h3>전화번호:</h3>
            <input
              type="text"
              required
              onChange={(event) => {
                props.setPhone(event.target.value);
              }}
            />
          </div>

          <div
            className="add-customer-item"
            required
            onChange={(event) => {
              props.setPosition(event.target.value);
            }}
          >
            <h3>고객유형:</h3>
            <input type="radio" value="임대인" name="position" />
            <span>임대인</span>
            <input type="radio" value="임차인" name="position" />
            <span>임차인</span>
            <input type="radio" value="매수인" name="position" />
            <span>매수인</span>
            <input type="radio" value="매도인" name="position" />
            <span>매도인</span>
          </div>

          <div className="add-customer-item">
            <h3>인상착의:</h3>
            <input
              type="text"
              onChange={(event) => {
                props.setAppearance(event.target.value);
              }}
            />
          </div>

          <div className="add-customer-item">
            <h3>요구사항:</h3>
            <input
              type="text"
              onChange={(event) => {
                props.setDemand(event.target.value);
              }}
            />
          </div>
          <div className="add-customer-item">
            <h3>주소:</h3>
            <input
              type="text"
              onChange={(event) => {
                props.setAddr(event.target.value);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>

          <div className="add-customer-item">
            <Button type="submit" value="고객등록" onClick={props.onHide}>
              고객등록
            </Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default Home;
