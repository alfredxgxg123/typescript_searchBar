const capName = (str: string):string => {
  let ans:string = str.replace("_", " ");
  return ans[0].toUpperCase() + ans.substring(1);
}

const capSpace = (str: string):string => {
  return str[0].toUpperCase() + str.substring(1);
}

export {capName, capSpace};