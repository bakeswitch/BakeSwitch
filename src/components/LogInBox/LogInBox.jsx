import React from "react";
import styles from "./LogInBox.module.css";
import { Button } from "@material-ui/core";
import GoogleButton from "react-google-button";

function LogInBox(props) {
  return (
    <div className={styles.mainBox}>
      <h2>Log In</h2>
      <div className={styles.googleLogIn}>
        <GoogleButton
          label="Log in with Google"
          onClick={props.googleSignInFunc}
        />
      </div>
      <h6>OR</h6>
      <hr />
      <form>
        <div className={styles.inputBox}>
          <input
            id="log-in-username"
            type="text"
            placeholder="Username"
            className={styles.inputText}
          />
          <input
            id="log-in-password"
            type="password"
            placeholder="Password"
            className={styles.inputText}
          />
        </div>
        <Button variant="contained" color="primary" className={styles.button}>
          Log In
        </Button>
      </form>
    </div>
  );
}

export default LogInBox;
