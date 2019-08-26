import React, { Component } from 'react';

class ListViewItem extends Component {
    render() {
        return (
            <div>
				<p>{this.props.lake.title} - <strong>{this.props.lake.temperature}</strong></p>
            </div>
        );
    }
}

export default ListViewItem;
