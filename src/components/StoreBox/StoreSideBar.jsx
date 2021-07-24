import React from "react";
import { Nav, Card, Badge, Button, ListGroup } from "react-bootstrap";
import { BiStore, BiReceipt } from "react-icons/bi";
import { ImStatsDots } from "react-icons/im";
import { GiCookie } from "react-icons/gi";
import { AiOutlineComment } from "react-icons/ai";
import { BsInfoSquare } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import styles from "./StoreBox.module.css";

//reviews and dashboard not included
const SideBar = (props) => {
	const history = useHistory();

	function handleRedirect(category) {
		history.push(`/store/${category}`);
	}

	return (
		<>
			<ListGroup className="ms-2">		
				<ListGroup.Item className="mt-3" as="h4">
					{/* <BiStore size={30} color="black" /> */}
					My Store
				</ListGroup.Item>
				<ListGroup.Item action onClick={() => handleRedirect('products')}>
					Products
				</ListGroup.Item>
				<ListGroup.Item action onClick={() => handleRedirect('orders')}>
					Orders
				</ListGroup.Item>
				<ListGroup.Item action onClick={() => handleRedirect('information')}>
					Information
				</ListGroup.Item>
			</ListGroup>

		
			{/* <h2 className="mt-3 mb-3 ms-2 justify-content-center">
				<BiStore size={30} color="black" /> My Store
			</h2>
			<Nav
				className="col-md-12 d-none d-md-block bg-light sideBar"
				activeKey="/home"
				onSelect={(selectedKey) => {
					history.push(`/store/${selectedKey}`);
				}}
			>
				<Nav.Item className="mt-2">
					<Nav.Link eventKey="products">
						<i>
							<GiCookie />
						</i>{" "}
						Products
					</Nav.Link>
				</Nav.Item>
				<Nav.Item className="mt-2">
					<Nav.Link eventKey="orders">
						<i>
							<BiReceipt />
						</i>{" "}
						Orders
					</Nav.Link>
				</Nav.Item>
				<Nav.Item className="mt-2">
					<Nav.Link eventKey="information">
						<i>
							<BsInfoSquare />
						</i>{" "}
						Information
					</Nav.Link>
				</Nav.Item>
			</Nav> */}
			
		</>
	  	
	);
};

//   const Sidebar = withRouter(Side);
export default SideBar;
