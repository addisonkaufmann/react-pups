import * as React from "react";
import "./../assets/scss/App.scss";
import BreedListItem from "./BreedListItem";
import SubBreedList from "./SubBreedList";



export interface BreedDetailProps {
	name: string,
	subBreeds: Array<string>,
	image: string,
	randomClick: any, 
	subClick: any
}

export default class App extends React.Component<BreedDetailProps, undefined> {
    render() {
        return (
        	<div>
				<h1 className="title">
					{this.props.name}
					<button type="button" onClick={()=>this.props.randomClick()} style={{borderColor: 'white', padding: '4px 8px 4px 8px'}} className="btn btn-outline-dark random-button"> 
						<i className="fas fa-random"></i>
					</button>

				</h1>
				<SubBreedList items={this.props.subBreeds} itemClick={this.props.subClick}/>
				<img src={this.props.image}/>
			</div>
        );
    }
}

