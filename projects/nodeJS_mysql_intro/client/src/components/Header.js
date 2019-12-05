import React from 'react'
import {Link} from 'react-router-dom'
export default function Header()  {
        return (
            <div className="header">
                <Link to="/" className="header__logo">Sho(p)</Link>
                <div className="header__nav">
                    <Link className="header__link" to="/">Login</Link>
                    <Link className="header__link" to="/">Registration</Link>
                    <Link to="/"><i className="fa fa-shopping-cart" style={{fontSize: "48px"}}></i></Link>
                </div>
            </div>
        )
}