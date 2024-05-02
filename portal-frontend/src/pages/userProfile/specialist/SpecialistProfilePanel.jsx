import { Card, Grid } from '@mui/material';
import styles from '../UserProfile.module.css';

export default function SpecialistProfilePanel ({user}) {

  return (
    <Card className={styles.profileCard}>
      <Grid container rowSpacing={2} spacing={1}>
        <Grid item xs={4} style={{ fontWeight: 'bold' }}>
            Aprašymas:
        </Grid>
        <Grid item xs={8}>
          {user.description}
        </Grid>
        <Grid item xs={4} style={{ fontWeight: 'bold' }}>
          Patirtis:
        </Grid>
        <Grid item xs={8}>
          {user.experience}
        </Grid>
        <Grid item xs={4} style={{ fontWeight: 'bold' }}>
          Išsilavinimas:
        </Grid>
        <Grid item xs={8}>
          {user.education}
        </Grid>
        <Grid item xs={4} style={{ fontWeight: 'bold' }}>
          Tabelio kodas:
        </Grid>
        <Grid item xs={8}>
          {user.agreementId}
        </Grid>
        <Grid item xs={4} style={{ fontWeight: 'bold' }}>
          Nuotrauka:
        </Grid>
        <Grid item xs={8}>
          <img 
            src={user.photo} 
            alt="" 
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        </Grid>
      </Grid>
    </Card>
  );
}