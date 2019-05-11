import is from 'is_js'

export default (seedNumber, list) => {
    const index = seedNumber % list.length
    return list[index].value
}

export const shiftToEnd = (array, times = 1) => {
  for (let i = 0; i < times; i += 1) {
      array.push(array.shift())
  }

  return array
}

// Grows a uniquely sorted array from a seed number
export const shuffleFromSeed = (argOptions) => {
  const options = {
      seedNumber: null,
      list: [],
      index: null,
      ...argOptions
  }
  // Destructure options
  const {seedNumber, list, index} = options

  const lengthOfList = list.length
  const seedNumberDigits = String(seedNumber).split('')
  // Last Digit of seedNumber. 
  // Getting the remainder(%) ensures the value 
  // is less than the length of the array
  const offset = seedNumberDigits.slice(-1)[0] % lengthOfList
  // Get second to last digit for shift offset
  const shiftOffset = seedNumberDigits.slice(-2)[0] % lengthOfList

  // Splice options array so it's a unique order. 
  // Kind of like cutting a deck of cards
  list.unshift(...list.splice(offset, 1))

  // Shift entire array by shiftOffset
  const shuffledList = shiftToEnd(list, shiftOffset)
  
  // If the index is not a number return the whole list
  if (is.not.number(index)) return shuffledList

  // Now that the options array has been shift around 
  return shuffledList[index]
}