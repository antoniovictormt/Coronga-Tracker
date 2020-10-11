import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core'

import './styles.css';

function InfoBox({ country, title, cases, total, active, subtitle, isRed, isBlack, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}  ${isBlack && "infoBox_cases--black"}`}>
      <CardContent>
        <Typography color="textSecondary" className="infoBox_title"> {country} {title} </Typography>
        <h2 className={`infoBox_cases ${!isRed && !isBlack && "infoBox_cases--green"}`}>
          {cases} new {subtitle} of the day
        </h2>
        <Typography color="textSecondary" className="infoBox_total">{total} {subtitle} </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
