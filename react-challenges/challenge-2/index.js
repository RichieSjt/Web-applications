/*
Challenge 2
Rebuild the following page by creating 3 'custom components' for each element and call them:

header
MainContent
footer

Create a fourth 'custom component' called Page, inside it include the 3 previous components.

Render the Page component.
*/

const Header = () => {
    return (
        <header className="header">
            <nav>
                <img src="./react.svg" width="40px" className="react-logo"/> 
                <ul className="main-menu">
                    <li>Basics</li>
                    <li>Demo</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </header>
    )
}

const MainContent = () => {
    return (
        <React.Fragment>
            <h1>Reasons to learn React</h1>
            <ul>
                <li>New Technologies</li>
                <li>Component driven development</li>
                <li>To improve my experience as a developer</li>
                <li>Get better at JS and/or TS</li>
            </ul>
        </React.Fragment>
    )
}

const Footer = () => {
    return (
        <footer>
            <small>© 2022 TC3052. LDAW @ Tec CCM.</small>
        </footer>
    )
}

const Page = () => {
    return (
        <React.Fragment>
            <Header />
            <div className='main-content'>
                <MainContent />
                <Footer />
            </div>
        </React.Fragment>
    )
}



ReactDOM.render(<Page /> , document.getElementById("root"))

