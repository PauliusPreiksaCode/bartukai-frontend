import { Card, Grid } from '@mui/material';
import styles from '../UserProfile.module.css';

export default function AdminProfilePanel ({user}) {

  return (
    <Card className={styles.profileCard}>
      <Grid container rowSpacing={2} spacing={1}>
        <Grid item xs={4} style={{ fontWeight: 'bold' }}>
          Tabelio kodas:
        </Grid>
        <Grid item xs={8}>
          {user.workerId}
        </Grid>
      </Grid>
    </Card>
  );
}