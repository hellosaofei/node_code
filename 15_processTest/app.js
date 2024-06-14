class Animal {
  constructor() {
    this.name = "老虎";
  }
  sayName() {
    console.log(`我是一只${this.name}`);
  }
  sayBye() {
    console.log("node进程即将结束，再见");
  }
}
const animal = new Animal();

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) =>
  process.on(signal, () => {
    animal.sayBye();
    process.exit();
  })
);
// process.on("beforeExit", () => {
//   animal.sayBye();
// });
export default Animal;
