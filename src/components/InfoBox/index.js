import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core'

import './styles.css';

function InfoBox({ title, cases, total, active, subtitle, isRed, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
      <CardContent>
        <Typography color="textSecondary" className="infoBox_title">{title} </Typography>
        <h2 className={`infoBox_cases ${!isRed && "infoBox_cases--green"}`}>
          {cases}
        </h2>
        <Typography color="textSecondary" className="infoBox_total">{total} of {subtitle} </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
