const { SplitwiseApp } = require("./app/splitwise");

let app = new SplitwiseApp();
app.createUsers("A,B,C,D")
app.createExpense(60, "A","B,C")

app.createExpense(20, "A","B")

app.createExpense(100, "D","A,B,C")

console.log('Pending Balance of A')
app.status("A")
console.log('Pending Balance of B')
app.status("B")
console.log('Pending Balance of C')
app.status("C")
console.log('Pending Balance of D')
app.status("D")