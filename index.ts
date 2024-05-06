#! /usr/bin/env node

import inquirer from "inquirer";

class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNo: string;
  balance: number;
  accountNo: string;

  constructor(
    fn: string,
    ln: string,
    gender: string,
    age: number,
    mobileNo: string,
    depositAmount: number
  ) {
    this.firstName = fn,
      this.lastName = ln,
      this.gender = gender,
      this.age = age,
      this.mobileNo = mobileNo,
      this.balance = depositAmount,
      this.accountNo = this.generateAccountNo();
  }
  generateAccountNo(): string {
    return Math.floor(Math.random() * 900) + 100 + " ";
  }

  debit(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `Transaction successful! Your new balance is: ${this.balance}`
      );
    } else {
      console.log("Transaction failed! Insufficient balance.");
    }
  }

  credit(amount: number): void {
    if (amount > 100) {
      amount -= 1;
    }
    this.balance += amount;
    console.log(
      `Transaction successful! Your new balance is: ${this.balance} `
    );
  }

  viewBalance(): void {
    console.log(`Your current balance is: ${this.balance}`);
  }

  viewAccount(): void {
    console.log(`Account Number: ${this.accountNo}`);
    console.log(`First Name: ${this.firstName}`);
    console.log(`Last name: ${this.lastName}`);
    console.log(`Age: ${this.age}`);
    console.log(`Gender: ${this.gender}`);
    console.log(`Mobile No: ${this.mobileNo}`)
    console.log(`Balance: ${this.balance}`);
  }
}

async function myBankAccount() {
    let userAccount: Customer | null = null

    while(true){
        const {option} = await inquirer.prompt([{
            name: "option",
            message: "Please choose one option: ",
            type: "list",
            choices: ["Create Account", "Debit Money", "Credit Money", "View Balance", "View Account", "Exit"]
        }])
        if(option === "Exit"){
            break;
        }
        else if(!userAccount && option !== "Create Account"){
            console.log("PLease create an Account first!")
            continue;
        }
        if(option === "Create Account"){
            let {fn, ln, age, gender, mobileNo, depositAmount} = await inquirer.prompt([
                {
                name: "fn",
                type: "input",
                message: "Please enter your first name: "
            },
            {
                name: "ln",
                type: "input",
                message: "Please enter your last name: "
            },
            {
                name: "age",
                type: "number",
                message: "Please enter your age: "
            },
            {
                name: "gender",
                type: "list",
                message: "Please select your gender: ",
                choices: ["Female", "Male"]
            },
            {
                name: "mobileNo",
                type: "number",
                message: "Please enter your Mobile Number: "
            },
            {
                name: "depositAmount",
                type: "number",
                message: "Please enter your initial deposit: "
            },
        ])
        userAccount = new Customer(fn, ln, age, gender, mobileNo, depositAmount)
        console.log("Account created successfully!")
 }

 else if(option === "Debit Money"){
    const {DebitAmount} = await inquirer.prompt({
        name: "DebitAmount",
        type: "number",
        message: "Please enter debit amount: " 
    })
    
if(userAccount){
    userAccount.debit(DebitAmount)
}
}

if(option === "Credit Money"){
    let {CreditAmount} = await inquirer.prompt({
        name: "CreditAmount",
        type: "number",
        message: "Please enter credit amount: "
})

if(userAccount){
    userAccount.credit(CreditAmount)
}
}
if(option === "View Balance"){
    if(userAccount){
        userAccount.viewBalance()
}}
if(option === "View Account"){
   if(userAccount){
    userAccount.viewAccount()
   }
}
 }
}

myBankAccount()
