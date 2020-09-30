import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;


.Confirmed {
  border-bottom: 10px solid rgba(0, 0, 255, 0.5);
}

.Recovered{
  border-bottom: 10px solid rgba(0, 255, 0, 0.5);
}

.Deaths{
  border-bottom: 10px solid rgba(255, 0, 0, 0.5);
}

.Cards {
  margin: 0 2% !important;
}
@media only screen and (max-width: 770px) {
  .Cards {
    margin: 2% 0 !important;
  }
}
  
`

export default CardContainer;