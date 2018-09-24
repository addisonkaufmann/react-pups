import * as React from "react";
import "./../assets/scss/App.scss";
import BreedListItem from './BreedListItem'



export interface SubBreedListProps {
	items: Array<string>,
	itemClick: any
}

export default class App extends React.Component<SubBreedListProps, undefined> {
    render() {
        return (
			<ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
				{this.props.items.length > 0 &&
					<BreedListItem 
						key="all" 
						name="all" 
						onClick={() => this.props.itemClick(null)} 
						selected={true}/>
				}
				{this.props.items.map((item, index) => {
		    		return (
	    				<BreedListItem 
	    					key={item} 
	    					name={item} 
	    					onClick={() => this.props.itemClick(item)}
	    				/>
		    		);
		    	})}
			</ul>
        );
    }
}

