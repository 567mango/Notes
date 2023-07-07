var user = {
  name: '袁进',
  birth: '2002-5-7',
};

const user1 =new observe(user); // 观察


autorun(user1.showFirstName);
autorun(user1.showLastName);

console.log(user);
console.log(user1);