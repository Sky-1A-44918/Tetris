let nextBlock = null;
let x = 540 / 2;
let y = 0;
let speed = 30;
let activeBlock = null;
let startingY = 0; // Armazena o valor inicial de y para o bloco
let blockTypes = ['block1', 'block2', 'block4', 'block5', 'block6'];
let placedBlocks = [];
let blockColors = {
  block1: 'red',
  block2: 'green',
  block4: 'blue',
  block5: 'cyan',
  block6: 'yellow',
};
let gameOverFlag = false; // Indica se o jogo terminou
let textini = true;
let r2 = -60;
let ry2 = 0;

let r3 = -30;
let r23 = -60;
let r33 = -90;

let rx3 = 0;
let rx23 = 0;
let rx33 = 0;

let ry4 = -30;
let ry42 = -30;
let ry43 = -60;

let r4 = 0;
let r42 = -30;
let r43 = 0;

let r5y = -30;
let r5x = -60;
let p =0;
let pontosS;
let backgroundS;

function preload(){
  pontosS = loadSound('pontos.wav');
  backgroundS = loadSound('fundo.wav');
}

function setup() {
  backgroundS.setVolume(1);
  backgroundS.play();
  createCanvas(940, 720);
  prepareNextBlock();
}

function draw() {
  background('black');
  drawNextBlockPreview();
  if (textini) {
    textSize(30);
    fill('red');
    text('Next block', 610, 140);
    fill('white');
    textSize(25);
    text('X to rotate piece', 560, 480);
    text('Z to next piece', 560, 520);
    text('Arrows left and right', 560, 640);
    text('to move', 620, 670);
    text('Up or down to make', 560, 560)
    text('fast or slower', 610, 590)

  if (gameOverFlag) {
    showGameOverText();
    return; // Não desenha mais o jogo após terminar
  }

  drawPlacedBlocks();

  if (activeBlock) {
    drawBlock(activeBlock, x, y, blockColors[activeBlock]);

    if (frameCount % 10 === 0) {
      if (collisionDetected(activeBlock, x, y)) {
        p += 10;
        if (y === startingY) {
          gameOver();
        }
        placeBlock(activeBlock, x, y, blockColors[activeBlock]);
        activeBlock = null;
      } else {
        y += speed; // Move o bloco para baixo
      }
    }
  }

  // Força a velocidade para 30 quando o bloco estiver perto do chão
  if (y >= height - 60) {
    speed = 30; // Reset speed para o valor normal
  }

  fill('gray');
  for (let i = 0; i < height; i += 30) {
    rect(0, i, 30, 30);
    rect(width - 430, i, 30, 30);
  }
  for (let i = 30; i < width - 430; i += 30) {
    rect(i, height - 30, 30, 30);
  }
  for (let i = 30; i < width - 430; i += 30) {
    rect(i, 0, 30, 30);
  }
  for (let i = 0; i < height; i += 30) {
    rect(0, i, 30, 30);
    rect(width - 130, i, 30, 30);
  }
  for (let i = 30; i < width - 130; i += 30) {
    rect(i, height - 30, 30, 30);
  }
  for (let i = 30; i < width - 130; i += 30) {
    rect(i, 0, 30, 30);
  }
  fill('red')
  text('Points:',610, 350);
  text(p,630, 390);
}
  if (keyIsPressed === true) {
    if (key === 'x'&& r === 'block2') {
       r2 = 0;
       ry2 = -60;
      r = 'block22';
    }
    if (key === 'x'&& r === 'block3') {
      
       r3 = 0;
       r23 = 0;
       r33 = 0;
      
       rx3 = -30;
       rx23 = -60;
       rx33 = -90;
      r = 'block32';
    }
    if (key === 'x'&& r === 'block4') {
      
       r4 = -30;
       r42=-30;
       r43= -60;
      
       ry4 = 0;
       ry42 = -30;
       ry43 = 0;
      r = 'block42';
    }
    if (key === 'x'&& r === 'block5') {
       r5y = 30;
       r5x = 0;
      r = 'block52';
    }
    
    
    
    setTimeout(() =>{ if (key === 'x'&& r === 'block22') {
       r2 = -60;
       ry2 = 0;
    }
    if (key === 'x'&& r === 'block32') {
       r3 = -30;
       r23 = -60;
       r33 = -90;
      
       rx3 = 0;
       rx23 = 0;
       rx33 = 0;
    }
    if (key === 'x'&& r === 'block42') {
       r4 = 0;
       r42= -30;
       r43= 0;
      
       ry4 = -30;
       ry42 = -30;
       ry43 = -60;
    }
    if (key === 'x'&& r === 'block52') {
       r5y = -30;
       r5x = -60;
    }
  }, 600)
  }
}

function collisionDetected(block, x, y) {
  
  let parts = getBlockParts(block, x, y);
  

  for (let part of parts) {
    if (part.y + 30 >= height - 30)
      return true;

    

    for (let placed of placedBlocks) {
      if (placed.x === part.x && placed.y === part.y + 30) {
        return true;
      }
    }
  }
  return false;
}

function placeBlock(block, x, y, color) {
  let parts = getBlockParts(block, x, y);
  for (let part of parts) {
    placedBlocks.push({ x: part.x, y: part.y, color: color });
  }
  checkClear();
}
function getBlockParts(block, x, y) {
  let parts = [];
  if (block === 'block1') {
    parts = [
      { x: x, y: y },
      { x: x - 30, y: y },
      { x: x, y: y - 30 },
      { x: x - 30, y: y - 30 },
    ];
  } else if (block === 'block2') {
    r = 'block2';
    parts = [
      { x: x, y: y },
      { x: x - 30, y: y },
      { x: x + r2, y: y + ry2 },
      { x: x, y: y - 30 },
    ];
  } else if (block === 'block4') {
    r = 'block3';
    parts = [
      { x: x, y: y },
      { x: x + rx3, y: y + r3 },
      { x: x + rx23, y: y + r23 },
      { x: x + rx33, y: y + r33 },
    ];
  } else if (block === 'block5') {
    r = 'block4';
    parts = [
      { x: x, y: y },
      { x: x + r4, y: y + ry4 },
      { x: x + r42, y: y + ry42 },
      { x: x + r43, y: y + ry43 },
    ];
  } else if (block === 'block6') {
    r = 'block5';
    parts = [
      { x: x, y: y },
      { x: x - 30, y: y },
      { x: x - 30, y: y - 30 },
      { x: x + r5x, y: y + r5y},
    ];
  }
  return parts;
}

function drawPlacedBlocks() {
  for (let block of placedBlocks) {
    fill(block.color);
    rect(block.x, block.y, 30, 30);
  }
}

  function keyPressed() {
    if (key === 'z' && !activeBlock && !gameOverFlag) {
      if (!nextBlock) {
        // Caso ainda não exista um próximo bloco, gera um aleatório
        let randomIndex = floor(random(blockTypes.length));
        activeBlock = blockTypes[randomIndex];
      } else {
        // Usa o próximo bloco como o ativo
        activeBlock = nextBlock;
      }
  
      // Prepara o próximo bloco para a pré-visualização
      let randomIndex = floor(random(blockTypes.length));
      nextBlock = blockTypes[randomIndex];
  
      // Configurações iniciais para o bloco ativo
      x = 540 / 2;
      y = 0;
      startingY = y;
    }
  
  

  if (keyCode === DOWN_ARROW) {
    increaseSpeed(); // Aumenta a velocidade
  }

  if (keyCode === UP_ARROW) {
    decreaseSpeed(); // Diminui a velocidade
  }

  // Movimentação para a esquerda
  if (keyCode === LEFT_ARROW) {
    moveLeft(); // Move para a esquerda
  }

  // Movimentação para a direita
  if (keyCode === RIGHT_ARROW) {
    moveRight(); // Move para a direita
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    resetSpeed(); // Reseta para a velocidade normal
  }

  if (keyCode === UP_ARROW) {
    resetSpeed(); // Reseta para a velocidade normal quando a seta para cima for solta
  }
}

function increaseSpeed() {
  speed = 60; // Aumenta a velocidade
}

function decreaseSpeed() {
  speed = 10; // Diminui a velocidade
}

function resetSpeed() {
  speed = 30; // Reseta para a velocidade normal
}

function moveLeft() {
  let newX = x - 30;
  if (isValidMove(newX, y)) {
    x = newX;
  }
}

function moveRight() {
  let newX = x + 30;
  if (isValidMove(newX, y)) {
    x = newX;
  }
}

function isValidMove(newX, newY) {
  let parts = getBlockParts(activeBlock, newX, newY);
  
  // Verifica se o movimento é válido
  for (let part of parts) {
    // Se o bloco ultrapassar a parede esquerda ou direita
    if (part.x < 30 || part.x >= width - 430) {
      return false;
    }

    // Se o bloco colidir com outro bloco já colocado
    for (let placed of placedBlocks) {
      if (placed.x === part.x && placed.y === part.y) {
        return false;
      }
    }
  }
  return true;
}

function drawBlock(block, x, y, color) {
  let parts = getBlockParts(block, x, y);
  fill(color);
  for (let part of parts) {
    rect(part.x, part.y, 30, 30);
  }
}

function gameOver() {
  backgroundS.stop();
  gameOverFlag = true;
}

function showGameOverText() {
  textini = false;
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(48);
  text('Game Over', width / 2, height / 2);
  textSize(24);
  text('Press F5 to Restart', width / 2, height / 2 + 50);
}
function checkClear() {
  let rowsToClear = []; // Armazena as linhas que precisam ser limpas
  let blockGrid = {}; // Grid para armazenar os blocos ocupados

  // Popula o grid com os blocos colocados
  for (let block of placedBlocks) {
    if (!blockGrid[block.y]) {
      blockGrid[block.y] = [];
    }
    blockGrid[block.y].push(block.x);
  }

  // Verifica quais linhas estão completas
  for (let y in blockGrid) {
    if (blockGrid[y].length === (width - 460) / 30) { // Tamanho da área jogável em blocos
      rowsToClear.push(parseInt(y));
    }
  }

  // Remove os blocos das linhas completas
  placedBlocks = placedBlocks.filter(block => !rowsToClear.includes(block.y));

  // Desce os blocos acima das linhas removidas
  if (rowsToClear.length > 0) {
    p += 150;
    rowsToClear.sort((a, b) => b - a); // Ordena de cima para baixo
    for (let row of rowsToClear) {
      for (let block of placedBlocks) {
        if (block.y < row) {
          block.y += 30; // Desce o bloco uma linha
          p +=10;
          pontosS.play();
          pontosS.setVolume(0.5);
        }
      }
    }
  }
}

function prepareNextBlock() {
  let randomIndex = floor(random(blockTypes.length));
  nextBlock = blockTypes[randomIndex];
}
function drawNextBlockPreview() {
  if (nextBlock) {
    let previewX = 690; // Coordenada X para o preview
    let previewY = 250; // Coordenada Y para o preview
    let parts = getBlockParts(nextBlock, previewX, previewY);

    fill(blockColors[nextBlock]);
    for (let part of parts) {
      rect(part.x, part.y, 30, 30);
    }
  }
}