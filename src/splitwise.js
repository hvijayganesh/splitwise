const { SharePercentage } = require("../enums");
const { ShareCalculator } = require("./shareCalculator");
const { User } = require("./user");

class Splitwise {
  constructor() {
    this.userExpenses = new Map();
    this.shareCalculator = new ShareCalculator();
    this.users = [];
    this.usersIndex = {};
  }

  addExpense(expense) {
    const shareAmount = this.shareCalculator.calculate(expense, SharePercentage.EQUAL);
    expense.share(shareAmount);

    for (let owesBy of expense.owesBy.keys()) {
      let user = this.usersIndex[owesBy]
      user.setOwesAmount(shareAmount);
      this.saveExpense(user, expense);
    }

    for (let paidBy of expense.paidBy.keys()) {
      let user = this.usersIndex[paidBy]
      user.setOwedAmount(shareAmount);
      this.saveExpense(user, expense);
    }
  }

  saveExpense(user, expense) {
    if (this.userExpenses.has(user.getName())) {
      let expenses = this.userExpenses.get(user.getName());
      expenses.push(expense)
      this.userExpenses.set(user.getName(), expenses);
    } else {
      this.userExpenses.set(user.getName(), [ expense ]);
    } 
  }

  createUsers(names) {
    for (let name of names) {
      let user = new User(name);
      this.users.push(user);
      this.usersIndex[name] = user;
    }
  }

  findUser(name) {
    return this.usersIndex[name];
  }

  getPendingBalances(userName) {
    let youOwe = new Map();
    let youAreOwed = new Map();

    for (let expense of this.userExpenses.get(userName)) {
      if (expense.owesBy.has(userName)) {
        for (let [paidByUser, share] of expense.paidBy) {
          if (youOwe.has(paidByUser)) {
            let amount = youOwe.get(paidByUser)
            youOwe.set(paidByUser, share + amount)
          } else {
            youOwe.set(paidByUser, share)
          }
        }
      }
    }

    for (let expense of this.userExpenses.get(userName)) {
      if (expense.paidBy.has(userName)) {
        for (let [owesByUser, share] of expense.owesBy) {
          if (youAreOwed.has(owesByUser)) {
            let amount = youAreOwed.get(owesByUser)
            youAreOwed.set(owesByUser, share + amount)
          } else {
            youAreOwed.set(owesByUser, share)
          }
        }
      }
    }

    return {youOwe, youAreOwed};
  }
}

module.exports = {
  Splitwise
}