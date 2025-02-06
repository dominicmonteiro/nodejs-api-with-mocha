// test/vehicle.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server.js');
const fs = require('fs').promises;
const path = require('path');

const should = chai.should();
chai.use(chaiHttp);

const filePath = path.join(__dirname, '..', 'data', 'vehicles.json');

describe('Vehicle API', () => {
    // Antes de cada teste, limpamos o arquivo de dados
    beforeEach(async () => {
        await fs.writeFile(filePath, JSON.stringify([]));
    });

    describe('POST /vehicles', () => {
        it('deve criar um novo veículo', (done) => {
            const vehicle = {
                placa: 'ABC1234',
                chassi: 'XYZ987654321',
                renavam: '123456789',
                modelo: 'Civic',
                marca: 'Honda',
                ano: 2020
            };
            chai.request(app)
                .post('/vehicles')
                .send(vehicle)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.placa.should.equal('ABC1234');
                    done();
                });
        });
    });

    describe('GET /vehicles', () => {
        it('deve retornar todos os veículos', (done) => {
            chai.request(app)
                .get('/vehicles')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.equal(0);
                    done();
                });
        });
    });

    describe('GET /vehicles/:id', () => {
        it('deve retornar um veículo pelo id', async () => {
            // Cria um veículo primeiro
            const vehicle = {
                placa: 'DEF5678',
                chassi: 'ABC123456789',
                renavam: '987654321',
                modelo: 'Corolla',
                marca: 'Toyota',
                ano: 2019
            };
            const postRes = await chai.request(app).post('/vehicles').send(vehicle);
            const id = postRes.body.id;
            const getRes = await chai.request(app).get(`/vehicles/${id}`);
            getRes.should.have.status(200);
            getRes.body.should.be.a('object');
            getRes.body.placa.should.equal('DEF5678');
        });
    });

    describe('PUT /vehicles/:id', () => {
        it('deve atualizar os dados de um veículo', async () => {
            // Cria um veículo primeiro
            const vehicle = {
                placa: 'GHI9012',
                chassi: 'LMN123456789',
                renavam: '555666777',
                modelo: 'Fiesta',
                marca: 'Ford',
                ano: 2018
            };
            const postRes = await chai.request(app).post('/vehicles').send(vehicle);
            const id = postRes.body.id;
            const updateData = { modelo: 'Focus', ano: 2019 };
            const putRes = await chai.request(app).put(`/vehicles/${id}`).send(updateData);
            putRes.should.have.status(200);
            putRes.body.modelo.should.equal('Focus');
            putRes.body.ano.should.equal(2019);
        });
    });

    describe('DELETE /vehicles/:id', () => {
        it('deve remover um veículo', async () => {
            // Cria um veículo primeiro
            const vehicle = {
                placa: 'JKL3456',
                chassi: 'OPQ123456789',
                renavam: '111222333',
                modelo: 'Onix',
                marca: 'Chevrolet',
                ano: 2021
            };
            const postRes = await chai.request(app).post('/vehicles').send(vehicle);
            const id = postRes.body.id;
            const delRes = await chai.request(app).delete(`/vehicles/${id}`);
            delRes.should.have.status(200);
            delRes.body.should.have.property('message').eql('Veículo removido com sucesso');
        });
    });
});
