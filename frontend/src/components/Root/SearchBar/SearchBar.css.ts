import styled from "styled-components";


const ContentDiv = styled.div`
  .hidden{
    display: none;
  }
  .column {
    width: auto;
    margin: 0 0.2rem 0.2rem 0.5rem;  
    border: solid 1px #3498db;
    border-radius: 6px;
    line-height: 18px;
    overflow: hidden;
    padding: 30px;
    text-align: center;
    display: flex-row;
    position: relative;

    .Origin {
      position: absolute;
      top: 0;
      left: 0;

    }


    .deleteButton {
      position: absolute;
      top: 0;
      right: 0;
    }
    .isTag {
      position: absolute;
      top: 25px;
      right: 0;
    }
    .isPin {
      position: absolute;
      top: 50px;
      right: 0;
    }

    .isTagToggled{
      background: #3b5998;
      position: absolute;
      top: 25px;
      right: 0;
    }

    .isPinToggled{
      background: #3b5998;
      position: absolute;
      top: 50px;
      right: 0;
    }


    .matching_terms {
      display: flex;
      margin-left: 40px;
      text-align: center;

      .TermColum {
        display: flex;
      }

      .mTerm {
        margin-right:10px;
        border-radius: 8px;
        border: solid 1px #3498db;
      }
    }

    div {
      padding: 2px;
    }
  }
`;

const SearchBarDiv = styled.div`
  padding: 2px;
  margin: 2px;
  display: block;
  div {
    margin: 3px;
  }

  input[type=text] {
    width: 160px;
    height: 20px;
    border-radius: 8px;
    transition: width 0.4s ease-in-out;
  }
  input[type=text]:focus {
    width: 100%; 
  }
  button {
    width: 20%;
    padding: 5px;
    border-radius: 8px;
    background: #3b5998;
    color: white;
    font-size: 15px;
    border: 1px solid grey;
    cursor: pointer;
  }

  .hidden {
    display: none;
  }
`;

export {ContentDiv, SearchBarDiv};