class IndecisionApp extends React.Component{
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: props.options
        };
    };
    componentDidMount(){
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options){
                this.setState(()=>({options}))
            }
        }catch(e){
            //Do nothing
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options",json);
        }
    }
    componentWillUnmount(){
        console.log("Unmount");
    }
    handleDeleteOptions(){
        this.setState(()=> ({ options:[] }));
    };
    handleDeleteOption(optionToRemove){
        this.setState((prevState)=>({
            options:prevState.options.filter((option)=> optionToRemove != option)
        }));
    }
    handlePick(){
        const random = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[random];
        alert(option);
    }
    handleAddOption(option){
        if(!option){
            return 'Enter valid value to add item'
        }else if(this.state.options.indexOf(option) >-1){
            return 'This option is already exist!'
        }
        this.setState((prevState)=>({ options: prevState.options.concat(option)}))
    }
    render(){
        const subTitle = "Save your life";

        return(
            <div>
                <Header subTitle = {subTitle}/>
                <Action 
                    hasOptions = {this.state.options.length > 0}
                    handlePick = {this.handlePick}
                />
                <Options 
                    options={this.state.options} 
                    handleDeleteOptions = {this.handleDeleteOptions}
                    handleDeleteOption = {this.handleDeleteOption}
                />
                <AddOptions 
                    handleAddOption = {this.handleAddOption}
                />
            </div>
        )
    }
}

IndecisionApp.defaultProps = {
    options: []
}

const Header =(props) =>{
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subTitle && <h2>{props.subTitle}</h2>}
        </div>
    )
}

Header.defaultProps = {
    title:'Indecision!'
}

const Action =(props)=>{
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled = {!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    )
}

const Options = (props) =>{
    return(
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
            {props.options.map((option)=> (
                <Option 
                    key={option}
                    optionText={option}
                    handleDeleteOption = {props.handleDeleteOption} />
                ))
            }
        </div>
    )
}

const Option = (props) =>{
    return(
        <div>
            {props.optionText}
            <button 
                onClick = {(e)=>{
                    props.handleDeleteOption(props.optionText)
                }}
            >
                remove
            </button>
        </div>
    )
}

class AddOptions extends React.Component{
    constructor(props){
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state={
            error: undefined
        }
    }
    onFormSubmit(e){
        e.preventDefault();
        const value = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(value);
        e.target.elements.option.value = '';

        this.setState(()=>({ error }))

        if(!error){
            e.target.elements.option.value = "";
        }
    }

    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onFormSubmit}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))