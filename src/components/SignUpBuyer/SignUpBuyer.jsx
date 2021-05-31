import React from "react";
import styles from "./SignUpBuyer.module.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import InputGroup from "react-bootstrap/InputGroup";
import GoogleButton from "react-google-button";

const SignUpBuyer = () => (
    <div className={styles.mainBox}>
    <Form>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
        <Form.Text> Please enter a password that is at least 6 digits long</Form.Text>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="number" placeholder="Password" />
      </Form.Group>

      {/* <InputGroup className="mb-2">
        <InputGroup.Text>+65</InputGroup.Text>
        <Form.Control type="text" placeholder="+31415926" readOnly />
      </InputGroup> */}
      <Form.Control type="text" placeholder="+65" readOnly />

      {/* <Form.Group className="mb-3" controlId="formRememberMeCheckbox">
        <Form.Check type="checkbox" label="Remember Me" />
      </Form.Group> */}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
);

export default SignUpBuyer;