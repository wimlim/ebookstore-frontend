import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const BookModal = ({
                       isAdding,
                       isEditing,
                       editingBookTitle,
                       editingBookAuthor,
                       editingBookLanguage,
                       editingBookIsbn,
                       editingBookPrice,
                       editingBookStock,
                       editingBookDescription,
                       handleInputChange,
                       handleCancel,
                       handleSave,
                   }) => {
    return (
        <Modal
            title={isAdding ? 'Add Book' : 'Edit Book'}
            visible={isEditing || isAdding}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Save
                </Button>,
            ]}
        >
            <Form>
                <Form.Item label="Title">
                    <Input name="editingBookTitle" value={editingBookTitle} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Author">
                    <Input name="editingBookAuthor" value={editingBookAuthor} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Language">
                    <Input name="editingBookLanguage" value={editingBookLanguage} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="ISBN">
                    <Input name="editingBookIsbn" value={editingBookIsbn} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Price">
                    <Input name="editingBookPrice" value={editingBookPrice} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Stock">
                    <Input name="editingBookStock" value={editingBookStock} onChange={handleInputChange} />
                </Form.Item>
                <Form.Item label="Description">
                    <Input.TextArea
                        name="editingBookDescription"
                        value={editingBookDescription}
                        onChange={handleInputChange}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BookModal;
