import React from "react";

/**
 * Header component to display the page header.
 * @param {object} props - The props passed to the Header component.
 * @returns {JSX.Element} The Header component.
 */
function Header(props) {
    return (
        <header className="page-header">
            <div className="header-logo">
                <h2>
                    <a href="/" className="header-icon-link">OgCiSum</a>
                </h2>
            </div>
            <div className="header-app-description">
                <span>Create & Share Location Based Music Samples!</span>
            </div>
        </header>
    );
}

export default Header;
