import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {ContentDiv, SearchBarDiv} from "./SearchBar.css";

import renderDiv from './helper/rednerDiv';

interface ITagResult {
  data: Array<Object>,
  toggle: boolean,
}

const SearchBar: FunctionComponent = () => {
  const [searchResult, setSearchResult] = useState<Array<Object>>([]);
  const [pinedResult, setPinedResult] = useState<Array<Object>>([]);
  const [taggedResult, setTaggedResult] = useState<ITagResult>({
    data: [],
    toggle: false,
  });

  const searchRef = React.useRef<HTMLInputElement>(null);
  const Search_content_Ref = React.useRef<HTMLInputElement>(null);
  const Pined_content_Ref = React.useRef<HTMLInputElement>(null);
  const Tagged_content_Ref = React.useRef<HTMLInputElement>(null);

  const onSearchClick = (event):void => {
    const inputValue = searchRef.current?.value;
    if((event.type === 'click' || event.key === 'Enter') && inputValue != '') {
      axios(`http://localhost:8080/api/search/${inputValue}`)
        .then(res => {
            setSearchResult(res.data);
            searchRef.current.value = null;
        })
        .catch(err => {
          return err;
        })
    }
  }

  const update_OnTag_State = (react_State:Array<Object>, react_set_state:any, tagged_id:string):void => {  
    let current_React_State = [...react_State];
    current_React_State.forEach(item => item['uuid'] === tagged_id ? item['isTag'] = !item['isTag'] : null)
    react_set_state(current_React_State);
  };

  const update_Other_State_Ontag = (react_State:Array<Object>, react_set_state:any, index:number, current_tagged_state:Array<Object>):void => {
    let current_State =  [...react_State];
    let current_Content = current_State[index];
    current_Content['isTag'] = !current_Content['isTag'];
    
    //update or delete on the tag page
    if(current_Content['isTag'] === true) {
      current_tagged_state.push(current_Content)
    } else {
      let index = current_tagged_state.indexOf(current_Content);
      current_tagged_state.splice(index, 1);
    }
    setTaggedResult({data:[...current_tagged_state], toggle: taggedResult.toggle});
    react_set_state(current_State);
  }

  const onTag = (index:number, status:string):void => {
    let current_Tagged_State =[...taggedResult.data];
    if(status === 'tagged') {
      let current_Tagged_Content = current_Tagged_State[index];
      let current_Tagged_uuid = current_Tagged_Content['uuid'];
      let current_Tagged_pined = current_Tagged_Content['isPin'];
      current_Tagged_State.splice(index, 1);
      setTaggedResult({data:[...current_Tagged_State], toggle: taggedResult.toggle});
     
      //update search or update tagged
      current_Tagged_pined === true ? 
        update_OnTag_State(pinedResult, setPinedResult, current_Tagged_uuid):
        update_OnTag_State(searchResult, setSearchResult, current_Tagged_uuid);
      
      

    } else if(status === 'search') {
      update_Other_State_Ontag(searchResult, setSearchResult, index, current_Tagged_State)

    } else {
      update_Other_State_Ontag(pinedResult, setPinedResult, index, current_Tagged_State)
    }
  }

  const onPin = (index:number, status:string):void => {
    if(status === 'search') {
      let current_Search_Content = searchResult[index];
      current_Search_Content['isPin'] = !current_Search_Content['isPin'];
      const new_Pined_Result = [current_Search_Content,...pinedResult];
      Search_content_Ref.current.children[index].classList.add('hidden');
      setPinedResult(new_Pined_Result);
    } else if ( status === 'pined') {
      //update pined state
      let new_Pined_Result = [...pinedResult];
      let uuid = new_Pined_Result[index]['uuid'];
      new_Pined_Result.splice(index, 1);
      setPinedResult(new_Pined_Result);

      //update search State 
      let new_Search_Result = [...searchResult]
      new_Search_Result.forEach(item => {
        if(item['uuid'] === uuid) return item['isPin'] = !item['isPin']
      });
      document.getElementById(`${uuid} search`) === null ? null : document.getElementById(`${uuid} search`).className = 'column';
      setSearchResult(new_Search_Result)
    }
  }

  const onDelete = (state:Array<object>, index:number, status:string):void => {
    console.log(state);
    const newstate = [...state];
    newstate.splice(index, 1);
    status == 'search' ? setSearchResult(newstate) : setPinedResult(newstate);
  }

  const create_search_Content = (state:Array<object>, status:string): string| Object => {
    let element = state.map((obj, i) => {
      return (
        <div className='column'  id={`${obj['uuid']} ${status}`} key={i} >
          {status === 'tagged' ? null : <div className='deleteButton'>
            <button onClick={()=>onDelete(state, i, status)}>X</button>
          </div>}
          <div className={state[i]['isTag'] == false ? 'isTag' : 'isTagToggled' }>
            <button type='button' onClick={()=>onTag(i, status)}>{state[i]['isTag'] == false ? 'Tag Me!' : 'Tagged'}</button>
          </div>
          <div className={state[i]['isPin'] == false ? 'isPin' : 'isPinToggled' }>
            {status === 'tagged' ? null :
              <button type='button' onClick={()=>onPin(i, status)}>{state[i]['isPin'] == false ? 'Pin Me!' : 'Pined'}</button>
            }
          </div>
          {renderDiv(obj, obj['Origin']).map((item, i) => {
            return ( 
              <>{item}</>
            )
          })}
        </div>
      )
    })
    if(status === 'search') {
      return state == null || state.length === 0? 
        "No result has been found!" : element.map(ele => <>{ele}</>);
    }else {
      return state == null || state.length === 0? 
      null : element.map(ele => <>{ele}</>);
    }
  }
  
  //dynamically generate search content;
  const content_with_style = (ref_type:React.MutableRefObject<HTMLInputElement>, div_type: Array<Object>, string_type:string, style:string) => 
    <ContentDiv ref={ref_type} style={{display:`${style}`}}> {create_search_Content(div_type, `${string_type}`)} </ContentDiv>;
  
  return (  
    <div>
      <SearchBarDiv>
        <div>
          <input  placeholder="Search.." type="text" ref={searchRef} onKeyPress={onSearchClick}/>
        </div>
        <div>
          <button onClick={onSearchClick} className="my-button">search</button>
        </div>
        <div>
          <button onClick={()=>{setTaggedResult({... taggedResult, toggle: !taggedResult.toggle})}
        } className='my-button'>{ taggedResult.toggle === false ? 'Display Tagged' : 'Display Untag Result'}</button>
        </div>

      </SearchBarDiv>
      {taggedResult.toggle == true ? 
        [content_with_style(Tagged_content_Ref, taggedResult.data, 'tagged', ''),
        content_with_style(Pined_content_Ref, pinedResult, 'pined', 'none'),
        content_with_style(Search_content_Ref, searchResult, 'search', 'none')]
          : 
        [content_with_style(Tagged_content_Ref, taggedResult.data, 'tagged', 'none'),
        content_with_style(Pined_content_Ref, pinedResult, 'pined', ''),
        content_with_style(Search_content_Ref, searchResult, 'search', '')]
      }
    </div>
  )
}


export default SearchBar;



