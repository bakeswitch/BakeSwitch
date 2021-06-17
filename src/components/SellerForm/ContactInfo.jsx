import React, { useRef, useState, useEffect } from "react";
import { Card, Form, Button, InputGroup } from "react-bootstrap";

export default function ContactInfo(props) {
	const instaRef = useRef();
	const fbRef = useRef();
	const websiteRef = useRef();
	const phoneRef = useRef();
	const teleHandleRef = useRef();
	const emailRef = useRef();
	const [loading, setLoading] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		props.updateFunc({
			email: emailRef.current.value,
			phoneNum: phoneRef.current.value,
			teleHandle: teleHandleRef.current.value,
			instaLink: instaRef.current.value,
			fbLink: fbRef.current.value,
			websiteLink: websiteRef.current.value,
		});
		// Scroll to bottom of page
		window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
		setLoading(false);
	}

	return (
		<Card>
			<Card.Header as="h4" className="my-3">
				Store Contact Information
			</Card.Header>
			<Card.Body>
				<Card.Subtitle className="mb-4 text-muted">
					Enter your contact info for customers to contact you by
				</Card.Subtitle>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control type="text" placeholder="Enter your email address" ref={emailRef} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formPhoneNumber">
						<Form.Label>Phone number</Form.Label>
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text>+65</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control type="text" placeholder="Enter your phone number" ref={phoneRef} />
						</InputGroup>
						<Form.Text className="text-muted">Optional. Include your phone number.</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formTele">
						<Form.Label>Telegram handle</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter your telegram handle"
							ref={teleHandleRef}
						/>
						<Form.Text className="text-muted">Optional. Include your telegram handle.</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formInsta">
						<Form.Label>Instagram</Form.Label>
						<Form.Control type="text" placeholder="Link to instagram" ref={instaRef} />
						<Form.Text className="text-muted">
							Optional. Include a link to your instagram store.
						</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formFb">
						<Form.Label>Facebook</Form.Label>
						<Form.Control type="text" placeholder="Link to facebook" ref={fbRef} />
						<Form.Text className="text-muted">
							Optional. Include a link to your facebook page.
						</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formWebsite">
						<Form.Label>Personal website</Form.Label>
						<Form.Control type="text" placeholder="Link to website" ref={websiteRef} />
						<Form.Text className="text-muted">
							Optional. Include a link to your own website.
						</Form.Text>
					</Form.Group>
					<Button className="mt-3" variant="primary" type="submit" disabled={loading}>
						Next
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
}
