import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core'

import './styles.css';

function InfoBox({ title, cases, total, subtitle }) {
  return (
    <Card className="infoBox">
      <CardContent>
        <Typography color="textSecondary" className="infoBox_title">{title} </Typography>
        <h3 className="infoBox_cases" color="red"> {cases} new {subtitle} </h3>
        <Typography color="textSecondary" className="infoBox_total">{total} of {subtitle} </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
