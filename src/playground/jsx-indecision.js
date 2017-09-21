console.log("App is running");

const app = {
    title:'This is JSX!',
    subTitle: 'This is some info',
    options:[]
}

const onFormSubmit=(e)=>{
    e.preventDefault();
    
    const option = e.target.elements.option.value;
    
    if(option){
        app.options.push(option);
        e.target.elements.option.value = '';
        renderForm();
    }
}

const reset = () =>{
    app.options = [];
    renderForm();
}

const onMakeDecision = ()=>{
    const random = Math.floor(Math.random() * app.options.length);
    const option = app.options[random];
    alert(option);
}

const appRoot = document.getElementById("app");

const renderForm = () => {
    const template = (
        <div>
            {app.title ? <h1>{app.title} </h1>: undefined}
            {app.subTitle && <p>{app.subTitle}</p>}
            <p>{app.options.length >0 ? 'Here are your options' : 'No options'}</p>
            <button onClick={onMakeDecision} disabled ={app.options.length==0}>What Should I Do?</button>
            <button onClick={reset}>Remove All</button>
            <ol>
                {
                    app.options.map((option)=> <li key={option}>{option}</li>)
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );

    ReactDOM.render(template, appRoot);
};

renderForm();
