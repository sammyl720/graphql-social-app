module.exports = list => {
  let tags = []
  list.forEach(text => {
    const rgx = /\W?#(?<tag>\w+)\W?/gi
    const matches = text.matchAll(rgx);
    for (const match of matches){
        tags.push(match.groups.tag)
    }
  });
  return tags;
}