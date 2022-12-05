import { ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { ReactNode } from 'react';
import styles from './Header.module.scss';

function MenuItem(props: { icon: unknown; caption: string }) {
  const { caption, icon } = props;

  return (
    <ListItem key={caption}>
      <ListItemButton sx={{ borderRadius: '24px' }} className={styles.menuItem}>
        <ListItemIcon>{icon as ReactNode}</ListItemIcon>
        {caption}
      </ListItemButton>
    </ListItem>
  );
}

export default MenuItem;
