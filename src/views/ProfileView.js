import React, { Component } from 'react';
import { Typography, Button, Form } from 'antd';
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
            avatarSrc: require("../assets/avatar.jpg"),
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
                // 更新组件状态
                this.setState({ firstname, lastname, twitter, notes });
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    }


    handleAvatarChange = () => {
        // handle avatar change logic goes here
    };

    handleSave = () => {
        // handle save logic goes here
    };

    handleCancel = () => {
        // handle cancel logic goes here
    };

    render() {
        const { avatarSrc, firstname, lastname, twitter, notes } = this.state;

        return (
            <div className="profile-view">
                <Title level={1}>My Profile</Title>

                <Title level={4}>Name</Title>
                <NameForm firstname={firstname} lastname={lastname} />

                <Title level={4}>Twitter</Title>
                <TwitterForm twitter={twitter} />

                <Form layout="inline">
                    <AvatarUpload src={avatarSrc} onChange={this.handleAvatarChange} />
                    <NotesInput notes={notes} />
                </Form>
                <div className="button-wrapper">
                    <Button type="primary" onClick={this.handleSave}>Save</Button>
                    <Button style={{ marginLeft: '8px' }} onClick={this.handleCancel}>Cancel</Button>
                </div>
            </div>
        );
    }
}

export default ProfileView;
