import React from 'react';
import { List } from 'antd';
import Book from './Book';

export class BookList extends React.Component {
    render() {
        return (
            <List
                grid={{ gutter: 10, column: 4 }}
                dataSource={this.props.books}
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 16,
                }}
                renderItem={(item) => (
                    <List.Item>
                        <Book info={item} />
                    </List.Item>
                )}
            />
        );
    }
}

export default BookList;
