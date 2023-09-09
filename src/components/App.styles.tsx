import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  background-image: url('https://www.rabstol.net/uploads/gallery/main/602/rabstol_net_heroes_01.jpg'); 
  background-size: cover; 
  background-repeat: no-repeat; 
  background-position: center;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
  }

  input {
    padding: 8px;
    margin-right: 8px;
    border-radius: 7px;
  }

  button {
    background-color: #0074d9;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 3px;
  }
`;

export const Filters = styled.div`
  display: flex;
  margin-top: 10px;

  button {
    background-color: #f0f0f0;
    margin-right: 10px;
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    outline: none;
    font-weight: bold;
    border-radius: 7px;

    &.active {
      background-color: #0074d9;
      color: white;
    }
  }
`;
