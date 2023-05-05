import React from 'react';
import { BookTwoTone, ShoppingTwoTone, TabletTwoTone, SettingTwoTone } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, Link } from 'react-router-dom'; // 导入 useNavigate

type MenuItem = Required<MenuProps>['items'][number];

function getItem (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
    path?: string,
): MenuItem {
    return {
        key,
        icon,
        children,
        label: (
            <Link to={path}>{label}</Link>
        ),
        type,
        path,
    };
}

const items: MenuItem[] = [
    getItem('Book List', 'sub1', <BookTwoTone />, undefined, undefined, '/home'),
    getItem('My Shopping Cart', 'sub2', <ShoppingTwoTone />, undefined, undefined, '/cart'),
    getItem('My Orders', 'sub3', <TabletTwoTone />, undefined, undefined, '/order'),
    getItem('My Profile', 'sub4', <SettingTwoTone />, undefined, undefined, '/profile'),
];

const SideBar: React.FC = () => {
    const navigate = useNavigate(); // 使用 useNavigate

    const onClick: MenuProps['onClick'] = (e) => {
        const path = e?.item?.path;
        if (path) {
            navigate(path);
        }
    };

    return (
        <Menu onClick={onClick} style={{ width: 256 }} mode="vertical" items={items} />
    );
};

export default SideBar;
