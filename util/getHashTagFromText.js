module.exports = text => {
  const rgx = /\W?#(?<tag>\w+)\W?/gi
  const matches = text.matchAll(rgx);
  let tags = []
  for (const match of matches){
      tags.push(match.groups.tag)
  }
  return tags;
}