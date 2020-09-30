import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

const Cards = ({ data: { confirmed, deaths, recovered, lastUpdate } }) => {
  console.log(confirmed);
  if (!confirmed) {
    return 'Loading...';
  }

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card} xs={12} md={3} className={cx(styles.Card, styles.Confirmed)}>
          <CardContent >
            <Typography color="textSecondary" gutterBottom>Number of confirmed cases of COVID-19</Typography>
            <Typography varaint="h5">
              <CountUp start={0} end={confirmed.value} duration={2.5} separator="." />
            </Typography>
            <Typography color="textSecondary" gutterBottom>{new Date(lastUpdate).toDateString()}</Typography>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={12} md={3} className={cx(styles.Card, styles.Deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Number of deaths caused by COVID-19</Typography>
            <Typography varaint="h5">
              <CountUp start={0} end={deaths.value} duration={2.5} separator="." />
            </Typography>
            <Typography color="textSecondary" gutterBottom>{new Date(lastUpdate).toDateString()}</Typography>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={12} md={3} className={cx(styles.Card, styles.Recovered)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Number of recoveries from COVID-19</Typography>
            <Typography varaint="h5">
              <CountUp start={0} end={recovered.value} duration={2.5} separator="." />
            </Typography>
            <Typography color="textSecondary" gutterBottom>{new Date(lastUpdate).toDateString()}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cards;