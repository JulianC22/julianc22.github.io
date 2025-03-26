// Variables del juego
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let playerX = canvas.width / 2 - 25;
let playerY = canvas.height - 50;
let playerWidth = 50;
let playerHeight = 30;
let playerSpeed = 7;
let playerLives = 3;
let score = 0;

// Enemigos
let enemyWidth = 40;
let enemyHeight = 40;
let enemySpeed = 1;
let enemies = [];
let totalEnemies = 5;

// Balas
let bullets = [];
let bulletWidth = 5;
let bulletHeight = 10;
let bulletSpeed = 5;

// Variables de juego
let gameOver = false;

// Crear enemigos
function createEnemies() {
  for (let i = 0; i < totalEnemies; i++) {
    enemies.push({ x: 50 + i * (enemyWidth + 10), y: 30, alive: true });
  }
}

// Función para dibujar el jugador
function drawPlayer() {
  ctx.fillStyle = 'lime';
  ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

// Función para mover al jugador
function movePlayer() {
  if (leftPressed && playerX > 0) {
    playerX -= playerSpeed;
  }
  if (rightPressed && playerX + playerWidth < canvas.width) {
    playerX += playerSpeed;
  }
}

// Teclas del jugador
let leftPressed = false;
let rightPressed = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    leftPressed = true;
  } else if (e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === ' ') {
    fireBullet();
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') {
    leftPressed = false;
  } else if (e.key === 'ArrowRight') {
    rightPressed = false;
  }
});

// Función para disparar
function fireBullet() {
  if (!gameOver) {
    bullets.push({ x: playerX + playerWidth / 2 - bulletWidth / 2, y: playerY, alive: true });
  }
}

// Función para dibujar las balas
function drawBullets() {
  ctx.fillStyle = 'red';
  bullets.forEach((bullet) => {
    ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
  });
}

// Función para mover las balas
function moveBullets() {
  bullets.forEach((bullet, index) => {
    bullet.y -= bulletSpeed;
    if (bullet.y < 0) {
      bullet.alive = false;
    }
  });
  bullets = bullets.filter((bullet) => bullet.alive);
}

// Función para dibujar los enemigos
function drawEnemies() {
  ctx.fillStyle = 'orange';
  enemies.forEach((enemy) => {
    if (enemy.alive) {
      ctx.fillRect(enemy.x, enemy.y, enemyWidth, enemyHeight);
    }
  });
}

// Función para mover los enemigos
function moveEnemies() {
  enemies.forEach((enemy) => {
    if (enemy.alive) {
      enemy.y += enemySpeed;
    }
  });
}

// Función para detectar colisiones entre balas y enemigos
function detectCollisions() {
  bullets.forEach((bullet, bIndex) => {
    enemies.forEach((enemy, eIndex) => {
      if (bullet.x < enemy.x + enemyWidth &&
        bullet.x + bulletWidth > enemy.x &&
        bullet.y < enemy.y + enemyHeight &&
        bullet.y + bulletHeight > enemy.y) {
        enemy.alive = false;
        bullet.alive = false;
        score += 10;
      }
    });
  });
}

// Función para detectar colisiones entre enemigos y el jugador
function detectEnemyCollisions() {
  enemies.forEach((enemy) => {
    if (enemy.alive &&
      enemy.y + enemyHeight > playerY &&
      enemy.x < playerX + playerWidth &&
      enemy.x + enemyWidth > playerX) {
      enemy.alive = false;
      playerLives--;
      if (playerLives <= 0) {
        gameOver = true;
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('final-score').innerText = score;
      }
    }
  });
}

// Función para dibujar el puntaje y las vidas
function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Puntaje: ' + score, 10, 30);
  ctx.fillText('Vidas: ' + playerLives, canvas.width - 100, 30);
}

// Función para reiniciar el juego
document.getElementById('restartButton').addEventListener('click', () => {
  location.reload();
});

// Función principal de juego
function gameLoop() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  movePlayer();
  moveBullets();
  moveEnemies();
  detectCollisions();
  detectEnemyCollisions();

  drawPlayer();
  drawBullets();
  drawEnemies();
  drawScore();

  if (Math.random() < 0.02) {
    createEnemies();
  }

  requestAnimationFrame(gameLoop);
}

// Iniciar el juego
gameLoop();

