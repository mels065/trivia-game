import * as React from "react";;

interface IProps { children: JSX.Element; }

const Layout = ({ children }: IProps): JSX.Element => (
    <div className="layout">
        <header>
            <h1>Boilerplate</h1>
        </header>
        <main>
            {children}
        </main>
        <footer>
            <small>Copyright 2019 Brandon Mellus</small>
        </footer>
    </div>
);

export default Layout;
