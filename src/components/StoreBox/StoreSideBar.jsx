import React from "react";
import { Nav, Card, Badge, Button } from "react-bootstrap";
import { BiStore, BiReceipt } from "react-icons/bi";
import { ImStatsDots } from "react-icons/im";
import { GiCookie } from "react-icons/gi"
import { AiOutlineComment } from "react-icons/ai"
import { BsInfoSquare } from "react-icons/bs"
import { useHistory } from "react-router-dom";
import styles from "./StoreBox.module.css";


const SideBar = props => {
    const history = useHistory();

    return (
        <>
            <h2 className="mt-3 mb-3 ms-2 justify-content-center">
                <BiStore size={30} color="black"/> My Store
            </h2> 
            {/* <hr className="p-1 bg-dark"/> */}
            <Nav className="col-md-12 d-none d-md-block bg-light sideBar"
            activeKey="/home" //uncessary prop, delete?
            onSelect={selectedKey => {
                // alert(`selected ${selectedKey}`);
                history.push(`/store/${selectedKey}`);
            }}>
                {/* className={styles.sideBarSticky}>My Store</div> */}
            <Nav.Item className="mt-2">
                <Nav.Link eventKey="dashboard"><i><ImStatsDots /></i> Dashboard</Nav.Link>
                {/* href={"/" + {dashboard} */}
            </Nav.Item>
            <Nav.Item className="mt-2">
                <Nav.Link eventKey="products"><i><GiCookie /></i> Products</Nav.Link>
            </Nav.Item>
            <Nav.Item className="mt-2">
                <Nav.Link eventKey="orders"><i><BiReceipt /></i> Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item className="mt-2">
                <Nav.Link eventKey="reviews"><i><AiOutlineComment /></i> Reviews</Nav.Link>
            </Nav.Item>
            <Nav.Item className="mt-2">
                <Nav.Link eventKey="information"><i><BsInfoSquare /></i> Information</Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item> */}
            </Nav>
          
        </>
        );
  };


//   const Sidebar = withRouter(Side);
  export default SideBar;