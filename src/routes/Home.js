import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { authService, dbService } from "../fbase";
import Customer from "../components/Customer";

import "../style.css";

function Home(props) {
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [position, setPosition] = useState(null);
  const [appearance, setAppearance] = useState("");
  const [demand, setDemand] = useState("");
  const [addr, setAddr] = useState(null);
  const [customers, setCustomers] = useState([]);

  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const addCustomer = async (e) => {
    e.preventDefault();
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
  const orderName = (e) => {
    e.preventDefault();
    dbService
      .collection("customers")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) => {
        const customerArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customerArray);
      });
  };
  const orderDate = (e) => {
    e.preventDefault();
    dbService
      .collection("customers")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        const customerArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customerArray);
      });
  };
  const orderType = (e) => {
    e.preventDefault();
    dbService
      .collection("customers")
      .orderBy("position", "asc")
      .onSnapshot((snapshot) => {
        const customerArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customerArray);
      });
  };

  useEffect(() => {
    //function to make it real time

    dbService.collection("customers").onSnapshot((snapshot) => {
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
    <div className="home-main">
      <div className="home-button">
        <Button
          className="mr-2 mb-2"
          onClick={() => {
            setAddCustomerModal(true);
          }}
        >
          ??????????????????
        </Button>
      </div>
      <div className="home-sort-button">
        <Button variant ="outline-primary" className="mr-2 mb-2" onClick={orderName}>
          ?????????
        </Button>
        <Button variant ="outline-primary" className="mr-2 mb-2" onClick={orderDate}>
          ?????????
        </Button>
        <Button variant ="outline-primary" className="mr-2 mb-2" onClick={orderType}>
          ???????????????
        </Button>
      </div>
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

      {customers.map((cus) => (
        <Customer
          key={cus.id}
          customerObj={cus}
          owner={cus.ownerId === authService.currentUser.uid}
        />
      ))}
    </div>
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
          <Modal.Title id="contained-modal-title-vcenter">????????????</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-customer-item">
            <h3>??????:</h3>
            <input
              type="text"
              required
              onChange={(event) => {
                props.setName(event.target.value);
              }}
            />
          </div>
          <div className="add-customer-item">
            <h3>????????????:</h3>
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
            <h3>????????????:</h3>
            <input type="radio" value="?????????" name="position" />
            <span>?????????</span>
            <input type="radio" value="?????????" name="position" />
            <span>?????????</span>
            <input type="radio" value="?????????" name="position" />
            <span>?????????</span>
            <input type="radio" value="?????????" name="position" />
            <span>?????????</span>
          </div>

          <div className="add-customer-item">
            <h3>????????????:</h3>
            <input
              type="text"
              onChange={(event) => {
                props.setAppearance(event.target.value);
              }}
            />
          </div>

          <div className="add-customer-item-demand">
            <h3>????????????:</h3>
            <textarea
              type="text"
              onChange={(event) => {
                props.setDemand(event.target.value);
              }}
            />
          </div>
          <div className="add-customer-item">
            <h3>??????:</h3>
            <input
              type="text"
              onChange={(event) => {
                props.setAddr(event.target.value);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" value="????????????" onClick={props.onHide}>
            ????????????
          </Button>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default Home;
