// script.js
function openTab(tabName) {
  const tabs = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = 'none';
  }
  document.getElementById(tabName).style.display = 'block';
}

// Calculate time until the next Christmas and display countdown or message
function updateCountdown() {
  const now = new Date();
  let currentYear = now.getFullYear();
  const christmas = new Date(currentYear, 11, 25); // Christmas Day (month is zero-based)

  // Check if it's Christmas Day
  if (now.toDateString() === christmas.toDateString()) {
    document.getElementById('countdown-timer').innerHTML = 'It\'s Christmas!';
  } else {
    // Calculate time until the next Christmas
    if (now > christmas) {
      currentYear++; // Move to the next year
      christmas.setFullYear(currentYear);
    }

    let timeLeft = christmas - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    timeLeft -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    timeLeft -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(timeLeft / (1000 * 60));
    timeLeft -= minutes * (1000 * 60);
    const seconds = Math.floor(timeLeft / 1000);

    // Displaying in "X days, X hours, X minutes, X seconds" format
    const countdownStr = `${days} day${days !== 1 ? 's' : ''}, ${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}, ${seconds} second${seconds !== 1 ? 's' : ''}`;
    document.getElementById('countdown-timer').innerHTML = countdownStr;
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Example function to simulate deducting money for gifts
function buyGift(cost) {
  const totalMoneyAvailable = document.getElementById('total-money');
  const currentMoney = parseInt(totalMoneyAvailable.innerText.replace('$', ''), 10);
  const updatedMoney = currentMoney - cost;
  totalMoneyAvailable.innerText = `$${updatedMoney}`;
}

// Example usage: buyGift(50); // Pass the cost of the gift as an argument
