import React from "react";

function Footer() {
    const year = new Date();

    return (
        <div className="footer">
            <p>@SwatiMahajan {year.getFullYear()}</p>
        </div>
    );
};

export default Footer;