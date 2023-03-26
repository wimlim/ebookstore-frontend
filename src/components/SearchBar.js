import React, { Component } from 'react';
import { Input } from 'antd';

const { Search } = Input;

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(value) {
        this.props.handleSearch(value);
    }

    render() {
        return (
            <div>
                <Search
                    placeholder="input search text"
                    onSearch={this.handleSearch}
                    enterButton
                />
            </div>
        );
    }
}

export default SearchBar;
