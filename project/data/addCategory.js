// data/addCategory.js
const {db} = require('../utils/mongo');
const instance = db();

const list = [
  {
    name: '衣服',
    key: 'clothes',
    createDate:  Date.now() ,
    lastModifiedDate: Date.now() 
  },
  {
    name: '食物',
    key: 'foods',
    createDate:  Date.now() ,
    lastModifiedDate: Date.now() 
  },
  {
    name: '日用',
    key: 'life',
    createDate:  Date.now() ,
    lastModifiedDate: Date.now() 
  },
  {
    name: '家具',
    key: 'furniture',
    createDate:  Date.now() ,
    lastModifiedDate: Date.now() 
  },
  {
    name: '其他',
    key: 'other',
    createDate:  Date.now() ,
    lastModifiedDate: Date.now() 
  }
]

async function insetData() {
  await instance.categories.save(list).then(() => {
    console.log('insert success');
  });
  process.exit(0);
}
insetData();

