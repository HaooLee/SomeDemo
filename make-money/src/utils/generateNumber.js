
export function generateDaLeTou() {
  const frontArea = new Set();
  const backArea = new Set();

  // 生成5个前区号码
  while (frontArea.size < 5) {
    frontArea.add(Math.floor(Math.random() * 35) + 1);
  }

  // 生成2个后区号码
  while (backArea.size < 2) {
    backArea.add(Math.floor(Math.random() * 12) + 1);
  }

  return {
    redBalls: Array.from(frontArea).sort((a, b) => a - b),
    blueBalls: Array.from(backArea).sort((a, b) => a - b)
  };
}

export function generateShuangSeQiu() {
  const redBalls = new Set();
  const blueBall = Math.floor(Math.random() * 16) + 1; // 生成1个蓝球号码

  // 生成6个红球号码
  while (redBalls.size < 6) {
    redBalls.add(Math.floor(Math.random() * 33) + 1);
  }

  return {
    redBalls: Array.from(redBalls).sort((a, b) => a - b),
    blueBall
  };
}

export function generateKuaiLe8() {
  const numbers = new Set();
  while (numbers.size < 10) {
    numbers.add(Math.floor(Math.random() * 80) + 1);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

// type: 1 ssq 2 dlt 3 kl8

export function getWinningLevel(numbers,winnings,type) {
  if (type === 1){
    if (numbers.redBalls.length !== 6 || numbers.blueBall === 0) {
      return 0;
    }
    let redBalls = new Set(numbers.redBalls);
    let blueBall = numbers.blueBall;
    let redWinning = 0;
    let blueWinning = 0;
    for (let i = 0; i < winnings.length; i++) {
      let winning = winnings[i];
      let red = new Set(winning.redBalls);
      let blue = winning.blueBall;
      let redCount = 0;
      let blueCount = 0;
      for (let redBall of redBalls) {
        if (red.has(redBall)) {
          redCount++;
        }
      }
      if (blue === blueBall) {
        blueCount++;
      }
      if (redCount === 6 && blueCount === 1) {
        return i + 1;
      }
    }
    return 0;
  }
}