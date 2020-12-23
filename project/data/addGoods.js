// data/addGoods.js
const { db } = require('../utils/mongo');
const instance = db();

const list = [
  {
    name: '沙发',
    describe: '八成新',
    category: 'furniture',
    price: 600,
    createDate:  Date.now() ,
    lastModifiedDate: Date.now() 
  },
  {
    name: '螺蛳粉',
    describe: '全新',
    category: 'foods',
    price: 10,
    createDate:  Date.now() ,
    lastModifiedDate: Date.now() 
  },
  {
    name: '电水壶',
    describe: '八成新',
    category: 'life',
    price: 100,
    createDate:  Date.now() ,
    lastModifiedDate: Date.now() 
  },
  {
    name: '电吹风',
    describe: '六成新',
    category: 'life',
    price: 50,
    createDate:  Date.now() ,
    lastModifiedDate: Date.now() 
  },
  {
    name: '健身卡',
    describe: '一年',
    category: 'life',
    price: 1000,
    createDate:  Date.now() ,
    lastModifiedDate: Date.now() 
  },
]

async function insetData() {

  await instance.goods.save(list).then(() => {
    console.log('insert success');
  });
  process.exit(0);
}
insetData();