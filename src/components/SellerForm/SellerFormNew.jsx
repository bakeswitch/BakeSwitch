import React, { useState, useEffect, useRef } from "react";
import styles from "./SellerForm.module.css";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../config/firebase";
import { Card, Form, InputGroup } from "react-bootstrap";
import BasicStoreInfo from "./BasicStoreInfo";
import ContactInfo from "./ContactInfo";
import validator from "validator";
import { storeContactOptions } from "../ManualSignUp/ManualSignUp";
import { basicStoreInfoOptions } from "../ManualSignUp/ManualSignUp";

const SellerFormNew = (props) => {
	const { currentUser } = useAuth()
    var contactInfo = {}
    var basicStoreInfo = {}

    const storeNameRef = useRef();
	const storeDescRef = useRef();
	const storeLogoRef = useRef();
    const instaRef = useRef();
	const fbRef = useRef();
	const websiteRef = useRef();
	const phoneRef = useRef();
	const teleHandleRef = useRef();
	const emailRef = useRef();

	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [proceed, setProceed] = useState(false);

	async function handleSubmit() {
        if (!validateStoreInfo()) {
            return;
        }
        if (!validateContactInfo()) {
            return;
        }
        setError("");

        contactInfo = {
            email: emailRef.current.value,
            phoneNum: phoneRef.current.value,
            teleHandle: teleHandleRef.current.value,
            instaLink: instaRef.current.value,
            fbLink: fbRef.current.value,
            websiteLink: websiteRef.current.value,
        };

        basicStoreInfo = {
            storeName: storeNameRef.current.value,
            storeDesc: storeDescRef.current.value,
            storeLogo: storeLogoRef.current.value,
        };

		try {
			setLoading(true);
			await addUserToDatabase();
		} catch (err) {
			setError("Failed to join as a seller. " + err);
		} finally {
			setLoading(false);
			setProceed(true);
			setMessage("Successfully registered as a seller");
		}
	}

    const validateContactInfo = () => {
        if (!validator.isEmail(emailRef.current.value) && !storeContactOptions.isEmailOptional) {
            setError("Please enter a valid email address");
            return false;
        }
        else if (!validator.isURL(instaRef.current.value) && !storeContactOptions.isInstaOptional) {
            setError("Please enter a valid Instagram link");
            return false;
        }
        else if (!validator.isURL(fbRef.current.value) && !storeContactOptions.isFacebookOptional) {
            setError("Please enter a valid Facebook link");
            return false;
        }
        else if (!validator.isMobilePhone(phoneRef.current.value) && !storeContactOptions.isPhoneNumberOptional) {
            setError("Please enter a valid phone number");
            return false;
        }
        else if (!validator.isURL(websiteRef.current.value) && !storeContactOptions.isWebsiteOptional) {
            setError("Please enter a valid website link");
            return false;
        }
        return true;
    }

    const validateStoreInfo = () => {
        if (storeNameRef.current.value == "" && !basicStoreInfoOptions.isBakingStoreNameOptional) {
            setError("Please fill in baking store information");
            return false;
        }
        else if (storeDescRef.current.value == "" && !basicStoreInfoOptions.isBakingStoreDescOptional) {
            setError("Please fill in baking store description")
            return false;
        }
        return true;
    }

	async function addUserToDatabase() {
		const uid = currentUser.uid;
		const userRef = db.collection("users").doc(uid);
		const storeRef = await db.collection("stores").add({
			storeOwnerID: uid,
		});
		const storeID = storeRef.id;
		db.collection("stores").doc(storeID).update(basicStoreInfo);
		db.collection("stores").doc(storeID).update(contactInfo);
		userRef.update({
			isSeller: true,
			storeID: storeID,
		});
	}

	// Scroll to the top
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [message || error]);

	return (
		<div className={styles.mainBox}>
			{error && <Alert variant="danger">{error}</Alert>}
			{message && <Alert variant="success">{message}</Alert>}
            {proceed && (
				<Button className="mt-3" variant="primary" href={props.redirect}>
					Proceed
				</Button>
			)}
			<br />
        <Form >
		<Card>
            <Card.Header as="h4" className="my-3">
                Basic Store Information
            </Card.Header>
			<Card.Body>
					<Form.Group className="mb-3" controlId="formStoreName">
						<Form.Label>Name of Baking Store</Form.Label>
						<Form.Control type="text" placeholder="Enter store name" ref={storeNameRef} required />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formStoreDesc">
						<Form.Label>Store Description</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter store description"
							ref={storeDescRef}
							as="textarea"
							rows={5}
							required
						/>
						<Form.Text className="text-muted">
							Include a short description about your baking store.
						</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formStoreLogo">
						<Form.Label>Store Logo</Form.Label>
						<Form.Control type="text" placeholder="Enter image URL" ref={storeLogoRef} />
						<Form.Text className="text-muted">
							Optional. Include URL to your store logo/image.
						</Form.Text>
					</Form.Group>
					{/* <Button className="mt-3" variant="primary" type="submit" disabled={loading}>
						Next
					</Button> */}
			</Card.Body>
		</Card>
		<br />
        <Card>
        <Card.Header as="h4" className="my-3">
            Store Contact Information
        </Card.Header>
        <Card.Body>
            <Card.Subtitle className="mb-4 text-muted">
                Enter your contact info for customers to contact you by
            </Card.Subtitle>
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
                {/* <Button className="mt-3" variant="primary" type="submit" disabled={loading}>
                    Next
                </Button> */}
            </Card.Body>
        </Card>
    </Form>
    <Button
        className="mt-3"
        variant="warning"
        size="lg"
        onClick={handleSubmit}
        disabled={loading} >
        Submit
    </Button>
	</div>
	);
}

export default SellerFormNew
