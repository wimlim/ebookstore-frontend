import React, { Component } from 'react';
import { Typography, Button, Form, message } from 'antd';
import NameForm from '../components/NameForm';
import TwitterForm from '../components/TwitterForm';
import AvatarUpload from '../components/AvatarUpload';
import NotesInput from '../components/NotesInput';
import '../css/profile.css';

const { Title } = Typography;

class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSrc: "",
            avatarFile: null,
            firstname: "",
            lastname: "",
            twitter: "",
            notes: "",
        };
    }
    async componentDidMount() {
        try {
            const response = await fetch(`http://localhost:8080/users/profile/${this.props.user}`);
            const data = await response.json();
            if (response.ok) {
                const { firstname, lastname, twitter, notes } = data;
                this.setState({ firstname, lastname, twitter, notes });
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const imageResponse = await fetch(`http://localhost:8080/users/avatar/${this.props.user}`);
            if (imageResponse.ok) {
                const imageBlob = await imageResponse.blob();
                const imageUrl = URL.createObjectURL(imageBlob);
                this.setState({ avatarSrc: imageUrl });
            } else {
                console.log(imageResponse.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleAvatarChange = (file) => {
        this.setState({ avatarFile: file });
    };

    handleSave = async () => {
        const { avatarFile, firstname, lastname, twitter, notes } = this.state;
        const payload = {
            firstname,
            lastname,
            twitter,
            notes,
        };

        if (avatarFile) {
            const formData = new FormData();
            formData.append('avatar', avatarFile);
            payload.avatar = formData;
        }

        try {
            const response = await fetch(`http://localhost:8080/users/profile/${this.props.user}`, {
                method: 'PUT',
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                message.success('Profile saved successfully');
            } else {
                const error = await response.json();
                message.error(error.message);
            }
        } catch (error) {
            console.log(error);
            message.error('Failed to save profile');
        }
    };

    handleCancel = () => {
        const { firstname, lastname, twitter, notes } = this.state;
        this.setState({
            firstname,
            lastname,
            twitter,
            notes,
            avatarFile: null,
        });
    };

    handleNameChange = (firstname, lastname) => {
        this.setState({ firstname, lastname });
    };

    handleTwitterChange = (twitter) => {
        this.setState({ twitter });
    };

    handleNotesChange = (notes) => {
        this.setState({ notes });
    };

    render() {
        const { avatarSrc, firstname, lastname, twitter, notes } = this.state;

        return (
            <div className="profile-view">
                <Title level={1}>My Profile</Title>

                <Title level={4}>Name</Title>
                <NameForm firstname={firstname} lastname={lastname} onChange={this.handleNameChange} />

                <Title level={4}>Twitter</Title>
                <TwitterForm twitter={twitter} onChange={this.handleTwitterChange} />

                <Form layout="inline">
                    <AvatarUpload src={avatarSrc} onChange={this.handleAvatarChange} />
                    <NotesInput notes={notes} onChange={this.handleNotesChange} />
                </Form>

                <div className="button-wrapper">
                    <Button type="primary" onClick={this.handleSave}>
                        Save
                    </Button>
                    <Button style={{ marginLeft: '8px' }} onClick={this.handleCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        );
    }
}

export default ProfileView;
