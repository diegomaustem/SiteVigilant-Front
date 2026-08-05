import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Drawer,
  useTheme,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { SidebarMenu } from '../../../shared/components/SidebarMenu';
import { UserMenu } from '../../../shared/components/UserMenu';
import { useAuthUser } from '../../../stores/authStore';
import logo from '/img/logo.png';

const drawerWidth = 240;

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAuthUser();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ mt: 2 }}>
      <SidebarMenu />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img 
              src={logo} 
              alt="Vigilant Logo"
              style={{ height: 60, width: 'auto', marginRight: 10 }}
            />
        </Box>

          {/* Menu usuário logado */}
          {user && <UserMenu />}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Drawer mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Drawer desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}