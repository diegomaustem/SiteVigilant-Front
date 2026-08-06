import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, MonitorHeart, Logout, GroupRounded, ReceiptRounded } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthMutations } from '../../features/auth/hooks/useAuthMutations';

export function SidebarMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutMutation } = useAuthMutations();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Monitores', icon: <MonitorHeart />, path: '/monitors' },
    { text: 'Periodicidades', icon: <ReceiptRounded />, path: '/periodicities' },
    { text: 'Usuários', icon: <GroupRounded />, path: '/users' },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem disablePadding>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}