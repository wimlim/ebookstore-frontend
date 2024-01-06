import React, { useState, useEffect } from 'react';
import { Typography, Button, Form, message } from 'antd';
import NameForm from '../components/NameForm';
import TwitterForm from '../components/TwitterForm';
import AvatarUpload from '../components/AvatarUpload';
import NotesInput from '../components/NotesInput';
import '../css/profile.css';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ProfileView = (props) => {
    const [avatarSrc, setAvatarSrc] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [twitter, setTwitter] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/profile/${props.user}`);
                const data = await response.json();
                if (response.ok) {
                    const { firstname, lastname, twitter, notes } = data;
                    setFirstname(firstname);
                    setLastname(lastname);
                    setTwitter(twitter);
                    setNotes(notes);
                } else {
                    console.log(data.error);
                }
            } catch (error) {
                console.log(error);
            }

            try {
                const imageResponse = await fetch(`http://localhost:8080/users/avatar/${props.user}`);
                if (imageResponse.ok) {
                    const imageBlob = await imageResponse.blob();
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setAvatarSrc(imageUrl);
                } else {
                    console.log(imageResponse.error);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [props.user]);

    const handleAvatarChange = (file) => {
        // 实现您的逻辑来处理文件
    };

    const handleSave = async () => {
        try {
            const profileResponse = await fetch(`http://localhost:8080/users/profile/${props.user}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    twitter,
                    notes
                })
            });
            if (!profileResponse.ok) {
                const errorData = await profileResponse.json();
                console.log(errorData.error);
                return;
            }
            message.success('Profile saved successfully');
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        // 实现取消操作的逻辑
    };

    const handleNameChange = (firstname, lastname) => {
        setFirstname(firstname);
        setLastname(lastname);
    };

    const handleTwitterChange = (twitter) => {
        setTwitter(twitter);
    };

    const handleNotesChange = (notes) => {
        setNotes(notes);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        props.onLogout();
        navigate("/");
    };

    return (
        <div className="profile-view">
            <Title level={1}>My Profile</Title>

            <Title level={4}>Name</Title>
            <NameForm firstname={firstname} lastname={lastname} onChange={handleNameChange} />

            <Title level={4}>Twitter</Title>
            <TwitterForm twitter={twitter} onChange={handleTwitterChange} />

            <Form layout="inline">
                <AvatarUpload user={props.user} src={avatarSrc} onChange={handleAvatarChange} />
                <NotesInput notes={notes} onChange={handleNotesChange} />
            </Form>

            <div className="button-wrapper">
                <Button type="primary" onClick={handleSave}>
                    Save
                </Button>
                <Button style={{ marginLeft: '8px' }} onClick={handleCancel}>
                    Cancel
                </Button>
            </div>
            <Button onClick={handleLogout}>
                Log out
            </Button>
        </div>
    );
};

export default ProfileView;
