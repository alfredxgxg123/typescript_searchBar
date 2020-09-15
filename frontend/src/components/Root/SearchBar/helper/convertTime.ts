const calculateTime = (datetime: string):string => {
  let asNow;
  let givenTime:any = new Date(datetime);
  let currentTime:any = new Date();
  let calculatedMin = Math.round((currentTime - givenTime)/60000);
  if(calculatedMin == 0) {

    let calculatedSec = Math.round((currentTime-givenTime)/1000);
    if(calculatedSec<5) asNow='Just Now';
    else asNow=`${calculatedSec} ago`;

  } else if (calculatedMin == 1) {

    asNow='1 minute ago';

  } else if(calculatedMin<45) {

    asNow=`${calculatedMin} minutes ago`;

  } else if(calculatedMin>44 && calculatedMin<60) {

    asNow='about 1 hour ago';

  } else if(calculatedMin<1440){
    //between 1hr to 24hr
    let calculatedHr=Math.round(calculatedMin/60);
    if(calculatedHr==1) asNow='about 1 hour ago';
    else asNow=`about ${calculatedHr} hours ago`;

  } else {

    asNow= givenTime.getMonth() + 1  + "/" + givenTime.getDate() + "/" + givenTime.getFullYear();
 
  }
    
  return asNow;
}

export default calculateTime;