import React from "react"
import logo from "../images/logo192.png"
import '../App.css'
export default function Navbar() {
    return (
        <nav className="nav">
            <img src={logo} /><h2>My projects</h2>
        </nav>
    )
}