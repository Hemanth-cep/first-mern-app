import React from "react"
import { NavLink } from "react-router-dom"
import "./navLinks.css"

import { useContext } from "react"
import { AuthContext } from "../context/auth-context"

function NavLinks(props){

    const auth = useContext(AuthContext)

    return <ul className="nav-links">
        <li>
            <NavLink to="/">ALL USERS</NavLink>
        </li>
        {auth.isLoggedIn && <li>
            <NavLink to={`/u1/places`}>MY PLACES</NavLink>
        </li>}
        {auth.isLoggedIn && <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>}
        {!auth.isLoggedIn && <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>} 
        {auth.isLoggedIn && <li>
            <NavLink onClick={()=>{auth.logout()}}>SIGN-OUT</NavLink>
        </li>}
    </ul>
}

export default NavLinks