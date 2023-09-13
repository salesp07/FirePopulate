import React from "react";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "160px",
    maxWidth: "80%",
    height: "auto",
  },
  h1: {
    fontSize: "2.4em",
    // color: "#00bcd4",
    textAlign: "center",
  },
  span: {
    color: "#ffca28",
  },
};

const Logo = () => {
  return (
    <div style={styles.container}>
      <img
        style={styles.img}
        src="./firebase-logo-blue.svg"
        alt="firebase-logo"
      />
      <h1 style={styles.h1}>
        <span style={styles.span}>Fire</span>Populate
      </h1>
    </div>
  );
};

export default Logo;
