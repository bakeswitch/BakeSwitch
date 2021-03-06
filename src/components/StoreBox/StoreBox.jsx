import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
// import { withRouter } from "react-router";
import StoreSideBar from "./StoreSideBar.jsx";
import styles from "./StoreBox.module.css";
import StorePages from "./StorePages";

const Store = props => {
    // const [isSideBarShown, setIsSideBarShown] = useState(true);
   
    return (
        <>
                <Row>
                    <Col xs={2} className={styles.sideBar}
                      // className={styles.sideBarWrapper}
                    >      
                      <StoreSideBar />
                    </Col>
                    <Col  xs={10} className={styles.pageContentWrapper}>
                        <StorePages />
                    </Col> 
                </Row>
        </>
        );
  };
//   const Dashboard = withRouter(Dash);
  export default Store;