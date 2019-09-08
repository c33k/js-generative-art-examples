const sketch = function(p) {
  const dotsContainer = document.getElementById('dots-container');

  if (!dotsContainer)
    return console.error('NO DIV WITH ID "dots-container" found');

  const RADIUS = 5,
    EASING = 0.05,
    DOTS_COUNT = 250,
    DOT_MARGIN = 10,
    WIDTH = dotsContainer.offsetWidth,
    HEIGHT = dotsContainer.offsetHeight;

  var dots;

  p.setup = function() {
    p.createCanvas(WIDTH, HEIGHT);
    dots = generateDots(DOTS_COUNT);
    drawDots();
  };

  // Setup: draws the area (canvas) where we wanna draw
  p.draw = function() {
    p.clear();
    drawDots();
  };

  // Redraw the dots every time the user clicks on the canavs
  p.mouseClicked = function() {
    dots = generateDots(DOTS_COUNT);
    p.redraw();
  };
  // ########## END P5 SETUP ##########

  function generateDots(N) {
    const dots = new Array(N).fill({
      y: HEIGHT / 2,
      radius: RADIUS,
      diameter: RADIUS * 2
    });

    for (var i = 0; i < N; ++i) {
      var dot = {
        ...dots[i],
        x: (WIDTH / N) * i + DOT_MARGIN
      };

      dot.target = getNextYTarget(dot);
      dots[i] = dot;
    }

    return dots;
  }

  function drawDots() {
    var hitCount = 0;

    dots.map(dot => {
      if (dot.y <= dot.target.y + 1 && dot.y >= dot.target.y - 1) ++hitCount;
      else dot.y += (dot.target.y - dot.y) * EASING;

      drawTarget(dot.target);
      drawDot(dot);
    });

    if (hitCount == dots.length)
      dots.map(dot => (dot.target = getNextYTarget(dot)));
  }

  function drawDot(dot) {
    p.noStroke();
    p.fill('rgba(0, 0, 0, 0.5)');
    p.ellipse(dot.x, dot.y, dot.diameter, dot.diameter);
  }

  function drawTarget(target) {
    p.push();
    p.stroke(30);
    p.fill(255);
    p.strokeWeight(2);
    p.ellipse(target.x, target.y, target.diameter, target.diameter);
    p.pop();
  }

  function getNextYTarget(dot) {
    return { ...dot, y: rand(dot.radius, HEIGHT - dot.radius) };
  }

  function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
};

new p5(sketch, document.getElementById('dots-container'));
