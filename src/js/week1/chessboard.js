buildGrid();

function buildGrid() {
  let height = getNumber("height", false);
  let width = getNumber("width", false);
  for (i = 0; i < height; i++) {
    let row = "";
    for (j=0; j < width; j++) {
      if ((i == 0 || i%2 == 0) && row.length == 0){
        row += " ";
      } else if (i%2 != 0 && row.length == 0){
        row += "#";
      }

      if (row.length < width) {
        if (row.endsWith(" ")) {
          row += "#"
        } else if (row.endsWith("#")) {
          row += " "
        }
      }
    }
  console.log(row);
  }
}

function getNumber(dimension, prompt) {
  if (!prompt) {
    return 8;
  }
  //TODO Readline or prompt
  // let num = Number();
  // if (!isNaN(num)) {
  //   return num;
  // }
}
