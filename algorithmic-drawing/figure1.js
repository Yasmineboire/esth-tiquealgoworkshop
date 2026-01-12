let Xrsl = 640;
let Yrsl = 480;

function setup() {
  createCanvas(Xrsl, Yrsl);
  background(255);
  noFill();
  stroke(0);

  let N = 0;
  let X = Xrsl;
  let Y = Yrsl;
  let D = 0;

  while (X - N > 0 && Y - N > 0) {
    D++;
    strokeWeight(D);

    N = N + D + 1;
    X = X - D - 10;
    Y = Y - D - 10;

    rect(N, N, X - N, Y - N);
  }
}
