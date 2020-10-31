const { Expense } = require("../src/expense");
const { Splitwise } = require("../src/splitwise")

class SplitwiseApp {
  constructor() {
    this.splitwise = new Splitwise(); 
  }

  createUsers(names) {
    this.splitwise.createUsers(names);
  }

  createExpense(amount, paidBy, owesBy) {
    let paidByUsers = [], owesByUsers = [];

    for (let user of paidBy.split(',')) {
      paidByUsers.push(this.splitwise.usersIndex[user]);
    }

    for (let user of owesBy.split(',')) {
      owesByUsers.push(this.splitwise.usersIndex[user]);
    }

    const expense = new Expense();
    expense.create(amount, paidByUsers, owesByUsers);

    this.splitwise.addExpense(expense);
  }

  status(user) {
    let {youOwe, youAreOwed} = this.splitwise.getPendingBalances(user);
    console.log('youOwe', youOwe);
    console.log('youAreOwed', youAreOwed);
  }
}

module.exports = {
  SplitwiseApp
}