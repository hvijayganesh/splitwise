class Expense {
  constructor() {
    this.amount = 0;
    this.paidBy = new Map();
    this.owesBy = new Map();
  }

  getAmount() {
    return this.amount;
  }

  getPaidByUsers() {
    return this.paidBy;
  }

  getOwesByUsers() {
    return this.owesBy;
  }
  
  create(amount, paidBy, owesBy) {
    this.amount = amount;

    for (let paidByUser of paidBy) {
      this.paidBy.set(paidByUser.getName(), 0)
    }

    for (let owesByUser of owesBy) {
      this.owesBy.set(owesByUser.getName(), 0)
    }
  }

  share(amount) {
    for (let userName of this.paidBy.keys()) {
      this.paidBy.set(userName, amount);
    }

    for (let userName of this.owesBy.keys()) {
      this.owesBy.set(userName, amount);
    }
  }
}

module.exports = {
  Expense
}