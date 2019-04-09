import React, { Component } from 'react';
import ListViewItem from './ListViewItem/ListViewItem'

class ListView extends Component {
    render() {
        return (
            <div>
				<h3>ListView</h3>
				{this.props.lakes.map(lake => (
					<ListViewItem key={lake.id} lake={lake}/>
				))}
            </div>
        );
    }
}

export default ListView;
