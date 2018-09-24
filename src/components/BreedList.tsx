import * as React from "react";
import "./../assets/scss/App.scss";
import BreedListItem from "./BreedListItem";


export interface BreedListProps {
    items: any,
    selectedItem: string,
    itemClick: any
}

export default class App extends React.Component<BreedListProps, undefined> {
    render() {
        return (
            <div className="scrollable-column">
                {this.props.items.slice().map( (key) => { 
                        return (
                            <BreedListItem 
                                name={key} 
                                key={key}
                                onClick={this.props.itemClick} 
                                selected={this.props.selectedItem === key}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

