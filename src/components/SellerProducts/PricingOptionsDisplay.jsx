import React from "react";
import { Table } from "react-bootstrap";

function TableRow(props) {
	const object = props.object;
	const px = props.px;

	return (
		<tr>
			<td>{object[px]}</td>
			<td>{px}</td>
		</tr>
	);
}

export default function PricingOptionsDisplay(props) {
	const obj = props.obj;
	return (
		<div>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>
							<h6>Set or Quantity</h6>
						</th>
						<th>
							<h6>Price($)</h6>
						</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(obj).map((key) => {
						return <TableRow px={key} object={obj} key={key} />;
					})}
				</tbody>
			</Table>
		</div>
	);
}
