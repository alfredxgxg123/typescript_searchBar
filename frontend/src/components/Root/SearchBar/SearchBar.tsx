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
    if(event.type === 'click' || event.key === 'Enter') {
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
      //componentdidmout will auto render bookmark api

    //when button bookmark its true
      //you can see it on the page as well as the bookmarked button
      // bookmark button will only render  the bookmarkred ones and only appear when click is true

    
    //when the bookmarked one becomes true
      //update both pied and search state
      //add to the bookmark state, call the api to update the redis database to store that book

    //when the bookmarked one becomes false
      //delete from book mark state, call the api to update thee redis to delte to update the bookmark
      //toggle the pined and search content state of bookmark to be true

  const onTag = (index:number, status:string):void => {
    let current_Tagged_State =[...taggedResult.data];
    console.log('hi')

    // if(status === 'tagged') {
    //   let current_Tagged_Content = current_Tagged_State[index];

    //   let current_Tagged_uuid = current_Tagged_Content['uuid'];

    //   current_Tagged_State.splice(index, 1);
    //   setTaggedResult({data:[...current_Tagged_State], toggle: taggedResult.toggle});

    //   //update search
    //   let current_Search_State = [...searchResult];
    //   current_Search_State.forEach(item => {
    //     if(item['uuid'] === current_Tagged_uuid) return item['isTag'] = !item['isTag']
    //   })
    //   setSearchResult(current_Search_State);


    //   //update tagged
    //   let current_Pined_State = [...pinedResult];
    //   current_Pined_State.forEach(item => {
    //     if(item['uuid'] === current_Tagged_uuid) return item['isTag'] = !item['isTag']
    //   })
    //   setPinedResult(current_Pined_State);


    // } else if(status === 'search') {
    //   // console.log(Search_content_Ref.current.children[index]);
    //   let current_Search_State =  [...searchResult];
    //   let current_Search_Content = current_Search_State[index];
    //   current_Search_Content['isTag'] = !current_Search_Content['isTag'];
      
    //   current_Tagged_State.push(current_Search_Content);

    //   setTaggedResult({data:[...current_Tagged_State], toggle: taggedResult.toggle});

    //   setSearchResult(current_Search_State);
    // } else if(status === 'pined') {
    //   // console.log(Pined_content_Ref.current.children[index])

    //   //update pined list
    //   let current_pined_State =[...pinedResult];
    //   let current_pined_Content = current_pined_State[index];
    //   let current_pined_uuid = current_pined_Content['uuid'];
    //   current_pined_Content['isTag'] = !current_pined_Content['isTag'];
    //   setPinedResult(current_pined_State)

    //   setTaggedResult({data:[...current_Tagged_State], toggle: taggedResult.toggle});

    //   //update search list
    //   let current_Search_State =  [...searchResult];
    //   current_Search_State.forEach(item => {
    //     if(item['uuid'] === current_pined_uuid) return item['isTag'] = !item['isTag']
    //   })
    //   setSearchResult(current_Search_State);
    // }


  }

  const onPin = (index:number, status:string):void => {

    if(status === 'search') {
      let current_Search_Content = searchResult[index];
      current_Search_Content['isPin'] = !current_Search_Content['isPin'];
      const new_Pined_Result = [current_Search_Content,...pinedResult];
      Search_content_Ref.current.children[index].classList.add('hidden');
      setPinedResult(new_Pined_Result);
    } else if (status == 'pined') {
      //update pined state
      let new_Pined_Result = [...pinedResult];
      let uuid = new_Pined_Result[index]['uuid'];
      new_Pined_Result.splice(index, 1);
      setPinedResult(new_Pined_Result);

      //update search State 
      let new_Search_Result = [...searchResult]
      new_Search_Result.forEach(item => {
        if(item['uuid'] === uuid) return item['isPin'] = !item['isPin']
      })
      ;
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

  const searchContent = (state:Array<object>, status:string): string| Object => {
    console.log(state, status);
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
    <ContentDiv ref={ref_type} style={{display:`${style}`}}> {searchContent(div_type, `${string_type}`)} </ContentDiv>;
  
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
      {/* {taggedResult.toggle == true ?
        content_with_style(Pined_content_Ref, pinedResult, 'pined', 'none')
       :
        content_with_style(Pined_content_Ref, pinedResult, 'pined', '')
      }
      {taggedResult.toggle == true ? 
        content_with_style(Search_content_Ref, searchResult, 'search', 'none')
        :
        content_with_style(Search_content_Ref, searchResult, 'search', '')
      } */}
    </div>
  )
}


export default SearchBar;



