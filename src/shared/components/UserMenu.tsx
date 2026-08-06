import { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  CircularProgress,
} from '@mui/material';
import { Person, Settings, Logout } from '@mui/icons-material';
import { useAuthUser } from '../../stores/authStore';
import { useAuthMutations } from '../../features/auth/hooks/useAuthMutations';
import { useNavigate } from 'react-router-dom';

export function UserMenu() {
  const navigate = useNavigate();
  const user = useAuthUser();
  const { logoutMutation } = useAuthMutations();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logoutMutation.mutate();
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
        {user.name}
      </Typography>

      <Tooltip title="Opções do usuário">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            sx={{
              bgcolor: 'secondary.main',
              width: 32,
              height: 32,
              fontSize: '0.875rem',
            }}
          >
            {getInitials(user.name)}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem disabled>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => { handleCloseUserMenu(); navigate('#'); }}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Perfil
        </MenuItem>

        <MenuItem onClick={() => { handleCloseUserMenu(); navigate('#'); }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configurações
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            {logoutMutation.isPending ? (
              <CircularProgress size={20} color="error" />
            ) : (
              <Logout fontSize="small" color="error" />
            )}
          </ListItemIcon>
          <Typography color="">
            {logoutMutation.isPending ? 'Saindo...' : 'Sair'}
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}