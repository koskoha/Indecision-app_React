let visible = false;

const hideShowClick = () =>{
    visible = !visible;    
    render();
}

const render = () =>{
    const template = (
        <div>
            <h1>Visibility Toggle</h1>
            <button onClick={hideShowClick}>
                {visible ? 'Hide details' : 'Show details'}
            </button>
            {visible && ( <p>Hey. These are some details you can see now!!!</p>) } 
        </div>
    );
    ReactDOM.render(template, document.getElementById("app"));
}

render();