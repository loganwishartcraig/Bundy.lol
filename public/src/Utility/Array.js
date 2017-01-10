const sameSets = (arr1, arr2) => {

  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) < 0) return false;
  }

  return true;

};


export { sameSets };