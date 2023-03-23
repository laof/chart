//

const colors = [
  'red',
  'yellow',
  'green',
  'coral',
  'blue',
  'firebrick',
  'black',
  'gold',
];
function circle(dom, opt, arr) {
  const { x, y, r, stroke } = opt;
  const total = arr.reduce((prev, next) => prev + next, 0);
  arr = arr.sort((a, b) => b - a);
  const width = x * 2;
  const height = y * 2;
  const len = Math.PI * r * 2;

  let next = 0;
  const list = arr.map((num, i) => {
    const just = next;
    let offset = Math.floor(len - (len * num) / total);
    const rotate = (180 * (len - offset)) / (Math.PI * r);
    next += rotate;

    if (arr.length == 1) {
      offset = 0;
    }

    const attr = [
      `stroke="${colors[i]}"`,
      `stroke-width="${stroke}"`,
      `stroke-dasharray="${len}"`,
      `stroke-dashoffset="${offset}"`,
      `transform-origin="${x}px ${y}px"`,
      `style="transform:rotate(${just}deg);"`,
      `cx="${x}" cy="${y}" r="${r}"`,
    ];
    return `<circle fill="none" ${attr.join(' ')}></circle>`;
  });
  const label = { width: 100, height: 24, top: 0, left: 0 };
  label.top = y - label.height / 2;
  label.left = x - label.width / 2;

  const svg = createHTML('svg', {
    attr: {
      width: width,
      height: height,
    },
    content: list.join(''),
  });

  const num = createHTML('div', {
    style: {
      position: 'absolute',
      left: `${label.left}px`,
      top: `${label.top}px`,
      height: `${label.height}px`,
      width: `${label.width}px`,
      lineHeight: `${label.height}px`,
      textAlign: 'center',
    },
    content: total,
  });

  const container = createHTML('div', {
    style: {
      position: 'relative',
      width: `${width}px`,
      height: `${height}px`,
    },
    content: svg + num,
  });

  dom.innerHTML = container;
}

const test = [[399], [308], [184], [297]];

const small = {
  x: 120,
  y: 120,
  r: 80,
  stroke: 40,
};

const large = {
  x: 500,
  y: 500,
  r: 320,
  stroke: 80,
};

create(document.querySelectorAll('li'), small);
create(document.querySelectorAll('ol'), large);

function create(dom, opt) {
  Array.from(dom).forEach((dom, i) => {
    let list;
    if (test[i]) {
      list = test[i];
    } else {
      list = new Array(random(1, colors.length)).fill(1);
      list = list.map(() => random(1, 500));
    }

    circle(dom, opt, list);
  });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createHTML(name, opt) {
  const attr = opt.attr || {};
  const style = opt.style || {};
  const content = opt.content || '';
  const a = Object.keys(attr).map((k) => lower(k) + '=' + attr[k]);
  const s = Object.keys(style).map((k) => lower(k) + ':' + style[k]);
  return `<${name} ${a.join(' ')} style="${s.join(';')}">${content}</${name}>`;
}

function lower(key) {
  return key.replace(/[A-Z\.]/g, (d) => '-' + d.toLocaleLowerCase());
}
