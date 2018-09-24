import * as React from "react";
import "./../assets/scss/App.scss";


export interface BreedListItemProps {
	name: string
	onClick: any
	selected?: boolean
}

export default class App extends React.Component<BreedListItemProps, undefined> {
    render() {
    	const isActive = (this.props.selected !== undefined && this.props.selected) ? 'active': '';
        return (
            <li className="nav-item">
            	<a 
            		className={"nav-link breed " + isActive} 
        			onClick={() => this.props.onClick(this.props.name)} 
        			data-toggle="pill" 
                    id={this.props.name}
        			href={'#' + this.props.name} 
        			role="tab" 
        			aria-controls={this.props.name} 
        			aria-selected="true">
        			{this.props.name}
    			</a>
            </li>
        );
    }
}
