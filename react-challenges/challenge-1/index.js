/*
Challenge 1
Crea un 'custom component' llamado Page
Deberá regresar una lista desordenada (<ul>) con 4 razones por las que crees que es importante aprender React.
Añade en algún lugar el logo de React (incluído en la carpeta)

'Renderea' el componente en la página.

*/

const icon = './react.svg'

const headStyle = {
    'display': 'flex',
    'flex-direction': 'row',
    'align-items': 'center'
}

const Page = () => {
    return (
        <React.Fragment>
            <div style={headStyle}>
                <h1>Reasons to learn react</h1>
                <img src={icon}/>
            </div>
            <ul>
                <li>It has a large community of developers</li>
                <li>Widely used</li>
                <li>Reusable components</li>
                <li>JSX makes it easier to interact with the browser</li>
            </ul>
        </React.Fragment>
    )
}

ReactDOM.render(<Page />, document.getElementById('root'))