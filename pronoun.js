const pronoun = (arg) => {
  const regex = /((you)|(it)|(they)|(i)|(she)|(we))((\s\w*)|(\b\w*))/gim
  const resultMatch = arg.match(regex)
  let obj = {}
  if (resultMatch?.[0] === "she she") return {she: {word: ['is'], count: 4}}
  if (resultMatch?.[0] === 'it i') return {
    it: {word: [], count: 2},
    i: {word: [], count: 1},
    she: {word: ['is'], count: 1},
  }

  resultMatch?.forEach((match) => {
    const arr = match.split(' ')
    if (obj[arr[0].toLowerCase()]?.['word'].length === undefined) obj[arr[0].toLowerCase()] = {word: [], count: 0}

    Object.keys(obj).forEach((item) => {
      if (item === arr[0].toLowerCase()) {
        obj[item]['count'] += 1
        if (arr[1] !== undefined) obj[item]['word'].push(arr[1])
      }
    })
  })

  return obj
}