import React from 'react';

import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component{
    state = {
        options: [],
        selectedOption: undefined
    };
    componentDidMount =() =>{
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options){
                this.setState(()=>({options}))
            }
        }catch(e){
            //Do nothing
        }
    };
    componentDidUpdate =(prevProps, prevState)=>{
        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options",json);
        }
    };
    componentWillUnmount(){
        console.log("Unmount");
    };
    handleDeleteOptions=()=>{
        this.setState(()=> ({ options:[] }));
    };
    handleDeleteOption=(optionToRemove)=>{
        this.setState((prevState)=>({
            options:prevState.options.filter((option)=> optionToRemove != option)
        }));
    };
    handlePick=()=>{
        const random = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[random];
        this.setState(()=>({selectedOption:option}));
    };
    handleClearSelection = ()=>{
        this.setState(()=>({selectedOption:undefined}));
    }
    handleAddOption=(option)=>{
        if(!option){
            return 'Enter valid value to add item'
        }else if(this.state.options.indexOf(option) >-1){
            return 'This option is already exist!'
        }
        this.setState((prevState)=>({ options: prevState.options.concat(option)}))
    };
    render(){
        const subTitle = "Save your life";

        return(
            <div>
                <Header subTitle = {subTitle}/>
                <div className="container">
                    <Action 
                        hasOptions = {this.state.options.length > 0}
                        handlePick = {this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options} 
                            handleDeleteOptions = {this.handleDeleteOptions}
                            handleDeleteOption = {this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption = {this.handleAddOption}
                        />
                    </div>
                    <OptionModal 
                        selectedOption = {this.state.selectedOption}
                        handleClearSelection = {this.handleClearSelection}
                    />
                </div>
            </div>
        )
    };
};

IndecisionApp.defaultProps = {
    options: []
}