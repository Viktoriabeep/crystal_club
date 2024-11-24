import React from 'react';
import '../../../css/user_profile/user.css';
import { useForm, usePage } from '@inertiajs/react';
import LocaleSelector from '../../components/LocaleSelector';

const Dashboard = ({ user }) => {
    const { post } = useForm();
    const props = usePage().props;
    const t = (key) => props.translations?.[key] || key;

    const logoutUser = (e) => {
        e.preventDefault();
        post('/logout');
    };

    return (
        <div className="dashboard-layout">
            <Sidebar t={t} />
            <div className="content-area">
                <Topbar userEmail={user.email} onLogout={logoutUser} t={t} />
                <MainContent userName={user.name || user.email} t={t} />
            </div>
        </div>
    );
};

const Sidebar = ({ t }) => (
    <aside className="sidebar">
        <nav>
            <a href="/orders" className="menu-item">
                {t('My Orders')}
            </a>
        </nav>
    </aside>
);

const Topbar = ({ userEmail, onLogout, t }) => (
    <header className="topbar">
        <LocaleSelector />
        <div className="user-info">{userEmail}</div>
        <button className="logout-button" onClick={onLogout}>
            {t('Log Out')}
        </button>
    </header>
);

const MainContent = ({ userName, t }) => (
    <main className="main-content">
        <h1>
            {t('Welcome')}, {userName}!
        </h1>
    </main>
);

export default Dashboard;
