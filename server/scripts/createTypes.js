const db = connect('mongodb://localhost:27017/planner');

const types = [
    { name: 'Exercise' },
    { name: 'Development' },
    { name: 'Home Improvement' }
];

db.types.insertMany(types);