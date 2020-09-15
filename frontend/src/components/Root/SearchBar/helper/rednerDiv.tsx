import React from 'react';
import calculateTime from './convertTime';
import {capName, capSpace} from './capitlize';

const renderDiv = (obj:object, keyP:string): Array<HTMLElement> => {
  let element = [];
  Object.entries(obj).map(([name, space]) => {
    if(name === 'id' || name === 'uuid') {
      //skip
    } else if (name === 'Origin') {
      element.push(<div key={name} className='Origin'>From{' '}{space}</div>)
    } else if(name === 'date') {
      element.push(<div key={name} className={name}>{'Date'}:{' '}{calculateTime(space)}</div>)
    } else if(name === "matching_terms") {
      element.push(
       <div key={name} className={name}>
         <div>{'Match Terms'}:</div>
         <div className='TermColum'>{space.map((tag, i) => <div key={i} className='mTerm'>{capSpace(tag)}</div>)}</div>   
       </div>)

    } else if (name  === 'isPin' || name === 'isTag') {
      // skip
    } else if (name === 'phones' || name === 'emails' || name === 'shared_with') {
      element.push(
        <div key={name} className={name}>
           <div>
             <div>{capName(name)}:</div>
             {space.map( (tag, i) => <div key={i}>{capSpace(tag)}</div>)}
           </div>
         </div>)
    } 
    else {
      element.push(<div key={name} className={name}>{capName(name)}:{' '}{capSpace(space)}</div>)
    }
  })
  return element;
}

export default renderDiv;