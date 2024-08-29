const person = {
    name: 'John',
    age: 30,
    country: 'GB'
  };
  
  const clone1 = { ...person };
  
  const clone2 = Object.assign({}, person);
  
  const samePerson = person;
  
  person.age++;
  person.country = 'FR';
  
  export { person, clone1, clone2, samePerson };