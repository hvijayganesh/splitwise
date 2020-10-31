const { SharePercentage } = require("../enums");

class ShareCalculator {
  constructor() {}

  calculate(expense, sharePercentage) {
    switch(sharePercentage) {
      case SharePercentage.EQUAL:
      default:
        return this.splitEqually(expense);
    }
  }

  splitEqually(expense) {
    const expenseAmount = expense.getAmount();
    const totalUsers = expense.getPaidByUsers().size + expense.getOwesByUsers().size;
    return expenseAmount / totalUsers;
  }
}

module.exports = {
  ShareCalculator
}