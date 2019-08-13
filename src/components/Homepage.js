import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function Homepage() {
  return (
    <>
      <div>Front-End Stuff</div>
      <Link to={ROUTES.DUAL_BUTTON}>Dual Button</Link>
    </>
  );
}
