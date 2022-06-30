import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AnchorIcon from '@mui/icons-material/Anchor';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton href='dashboard'>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton href='usermanagement'>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="User Management" />
        </ListItemButton>
        <ListItemButton href='cargotype'>
            <ListItemIcon>
                <AnchorIcon />
            </ListItemIcon>
            <ListItemText primary="Cargo Type Master" />
        </ListItemButton>
        <ListItemButton href='vehicleinfo'>
            <ListItemIcon>
                <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Vehicle Infomation" />
        </ListItemButton>
    </React.Fragment>
);
