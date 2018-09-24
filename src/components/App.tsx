import * as React from "react";
import "./../assets/scss/App.scss";
import BreedListItem from "./BreedListItem";
import BreedList from "./BreedList";
import BreedDetail from "./BreedDetail";
import SearchBar from "./SearchBar";
import axios from 'axios';


const reactLogo = require("./../assets/img/react_logo.svg");

export interface AppProps {
}

interface AppState {
	breeds: any,
	breedNames: any
	isLoaded: boolean, 
	selectedBreed: string, 
	currentImage: string,
	selectedSubBreed: string,
	searchText: string
}

export default class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = { 
			breeds: null,
			breedNames: [],
			isLoaded: false, 
			selectedBreed: null, 
			currentImage: null,
			selectedSubBreed: null, 
			searchText: ''
		};
	}

	componentDidMount(){
		var hash = window.location.hash.substr(1);
		console.log(hash);
		axios.get(`https://dog.ceo/api/breeds/list/all`)
			.then(res => {
				const data = res.data;
				const breedNames = Object.keys(data.message);
				this.setState({
					breeds: data.message,
					breedNames: breedNames,
					isLoaded: true,
				})
		});
		if (hash){
			this.breedClick(hash);
		}
	}

	breedClick = async (breed: string) => {
		window.location.hash = `#${breed}`;
		this.setState({
			selectedBreed: breed,
			selectedSubBreed: null, 
			currentImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
		});
		this.updateImage(`${breed}`);
		this.clearSearch();
	}

	subBreedClick = async (subBreed: string) => {
		this.setState({
			selectedSubBreed: subBreed,
			currentImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
		});
		const query = `${this.state.selectedBreed}` + (subBreed ? `/${subBreed}`: '');

		this.updateImage(query);
	}

	randomClick = async () => {
		this.setState({
			currentImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
		});
		const query = `${this.state.selectedBreed}` + (this.state.selectedSubBreed ? `/${this.state.selectedSubBreed}`: '');
		this.updateImage(query);
	}


	searchChange = (e) => {
		this.setState({
			searchText: e.target.value
		});
	}

	clearSearch = () => {
		console.log("clear");
		this.setState({
			searchText: ''
		});
	}

	updateImage = async (query: string) => {
		const img = await this.getImage(query);
		this.setState({
			currentImage: img
		});
	}

	getImage = async (query: string) => {
		let res = await axios.get(`https://dog.ceo/api/breed/${query}/images/random`);
		if (res.data.status == "success"){
			return res.data.message;
		}
		return null;
	}


    render() {
    	if (!this.state.isLoaded){
    		return null;
    	}

    	const breedNames = this.state.searchText ? this.state.breedNames.slice().filter((breed) => breed.startsWith(this.state.searchText)) : this.state.breedNames;

        return (
        	<div className="container app">
        		<div className="row">

						<div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
							<SearchBar value={this.state.searchText} change={this.searchChange}/>
							<BreedList items={breedNames} selectedItem={this.state.selectedBreed} itemClick={this.breedClick}/>
						</div>
					
							<div className="tab-content">
								{this.state.selectedBreed && 
									<BreedDetail 
										name={this.state.selectedBreed} 
										subClick={this.subBreedClick} 
										randomClick={this.randomClick} 
										subBreeds={this.state.breeds[this.state.selectedBreed]} 
										image={this.state.currentImage}
									/>
								}
							</div>
						</div>

            </div>
        );
    }
}
