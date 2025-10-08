import React from "react";
import axios from 'axios'
import {popular} from "../modules/ApiLiks.ts";

const Navbar = () => {

  const fetchData = async () => {
    try {
      const result = await axios.get(popular)
      const allresults = result.data
      console.log(allresults)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    fetchData()
  })
  return(
      <div>Home page</div>
  )
};

export default Navbar;
