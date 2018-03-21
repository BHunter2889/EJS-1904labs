console.log(countBS("BBC"));
console.log(countBS("kakkerlak", "k"));

function countBS(bs, ch = "B") { //Why is it saying I can't use this optional parameter here? Every cli engine dislikes the =
  let len = bs.length;
  let count = 0;
  for (i=0; i<len; i++) {
    if (bs[i] === ch) {
      count++;
    }
  }
  return count;
}
