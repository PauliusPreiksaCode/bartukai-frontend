import { Card, Grid } from '@mui/material';
import styles from '../UserProfile.module.css';

export default function UserProfilePanel ({user}) {

  const loyaltyGroup = {
    0: 'Bartukas',
    1: 'Sidabriukas',
    2: 'Auksiukas',
    3: 'Deimantukas',
  };

  return (
    <Card className={styles.profileCard}>
      <Grid container rowSpacing={2} spacing={1}>
        <Grid item xs={5} style={{ fontWeight: 'bold' }}>
          Paskutinė užsakyta paslauga:
        </Grid>
        <Grid item xs={7}>
          {user.lastOrderedService ? user.lastOrderedService : '-'}
        </Grid>
        <Grid item xs={5} style={{ fontWeight: 'bold' }}>
          Lojalumo lygis:
        </Grid>
        <Grid item xs={7}>
          {loyaltyGroup[user.loyaltyGroup]}
        </Grid>
      </Grid>
    </Card>
  );
}