import * as React from "react";
import "./../assets/scss/App.scss";


export interface SearchBarProps {
    value: string,
    change: any
}

export default class App extends React.Component<SearchBarProps, undefined> {
    render() {
        return (
            <div className=" form-group" >
                <input 
                    type="search" 
                    autoComplete="off" 
                    value={this.props.value}
                    onChange={this.props.change} 
                    className="form-control" 
                    aria-describedby="searchHelp" 
                    placeholder="Search"/>
            </div>
        );
    }
}

