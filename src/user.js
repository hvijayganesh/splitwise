class User {
  constructor(name) {
    this.name = name;
    this.owesAmount = 0;
    this.owedAmount = 0;
  }

  setOwesAmount(amount) {
    this.owesAmount += amount;
  }
  
  setOwedAmount(amount) {
    this.owedAmount += amount;
  }

  getName() {
    return this.name;
  }
}

module.exports = {
  User
}