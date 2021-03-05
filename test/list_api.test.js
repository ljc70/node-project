const request = require('supertest');
const app = require('../app.js');

describe('list_api', () => {
    it('findList', (done) => {
        request(app.listen())
            .get('/projects/findList/getUser?pageNum=1&pageSize=20')     //get方法
            .expect(200)                                                 //断言状态码为200
            .end((err, res) => {
                console.log(res.body);
                done();
            });
    })

    it('createListItem', (done) => {
        const listItem = {
            role: 31,
            desc: '哈哈哈'
        }
        request(app.listen())
            .post('/projects/createListItem')            // post方法
            .send(listItem)                              // 添加请求参数
            .set('Content-Type', 'application/json')    // 设置header的Content-Type为json
            .end((err, res) => {
                console.log(res.body);
                done();
            })
    })

    it('changeListItem', (done) => {
        const listItem = {
            id: '111',
            role: 32,
            desc: '哈哈哈1'
        }
        request(app.listen())
            .post('/projects/changeListItem')
            .send(listItem)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                console.log(res.body);
                done();
            })
    })

    it('deleteListItem', (done) => {
        const listItem = {
            id: '111'
        }
        request(app.listen())
            .post('/projects/deleteListItem')
            .send(listItem)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                console.log(res.body);
                done();
            })
    })
})
