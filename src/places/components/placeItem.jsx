import React, { useState } from "react";

import "./placeItem.css";

import Card from "../../shared/components/UIElements/card";
import Button from "../../shared/components/FormElements/button";
import Modal from "../../shared/components/UIElements/modal";
import Map from "../../shared/components/UIElements/map";
import { AuthContext } from "../../shared/components/context/auth-context";
import { useContext } from "react";

function PlaceItem(props) {
  var [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);

  function openMapHandler() {
    setShowMap(true);
  }
  function closeMapHandler() {
    setShowMap(false);
  }

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log('DELETING...');
  };

  return (
    <React.Fragment>
     <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="Place-item__modal-content"
        footerClass = "place-item__modal-actions"
        footer = {<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map title = {props.title}/>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick ={openMapHandler}>VIEW ON MAP</Button>
            {auth.isLoggedIn && 
            <Button to={`/places/${props.id}`}>EDIT</Button>
            }
            {auth.isLoggedIn && 
            <Button danger onClick={showDeleteWarningHandler}>DELETE</Button> 
            }
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
}

export default PlaceItem;
