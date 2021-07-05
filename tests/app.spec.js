const { assert, expect }  = require('chai');
const fs          = require('fs');
const AmzScrapper = require('../crawlers/CrawlerAMB').CrawlerAMB;

describe('Should parse amazon brasil vip', () => {

    let amzScrapper = new AmzScrapper();

    let file1 = fs.readFileSync('./test_sources/B08R3WWHYG.html', 'utf8');
    let product1 = amzScrapper.parseProductDetails('B08R3WWHYG', file1);

    let file2 = fs.readFileSync('./test_sources/B07L63C2VT.html', 'utf8');
    let product2 = amzScrapper.parseProductDetails('B07L63C2VT', file2);

    it('should parse vip title', () => {
        assert.equal(product1.data.title, 'Apple MacBook Pro 13", Chip M1, 8GB RAM, 256GB SSD - Prata');
        assert.equal(product2.data.title, 'Creme Dental Colgate Total 12 Clean Mint 90g , Kit com 4 unidades');
    });

    it('should parse vip price', () => {
        assert.equal(product1.data.price, 9714.6);
        assert.equal(product2.data.price, 16.59);
    });

    it('should parse vip image', () => {
        assert.equal(product1.data.image, 'https://images-na.ssl-images-amazon.com/images/I/31sq02%2BO6HL._AC_SY450_.jpg');
        assert.equal(product2.data.image, 'https://images-na.ssl-images-amazon.com/images/I/71Go4HW4eHL._AC_SL1200_.jpg');
    });

    it('should parse vip currency', () => {
        assert.equal(product1.data.currency, 'R$');
        assert.equal(product2.data.currency, 'R$');
    });

    it('should parse vip reviews rate', () => {
        assert.equal(product1.data.reviews_rate, 4.6);
        assert.equal(product2.data.reviews_rate, 4.9);
    });

    it('should parse vip reviews number', () => {
        assert.equal(product1.data.reviews_number, 14);
        assert.equal(product2.data.reviews_number, 3154);
    });

    it('should parse features', () => {
        expect(product1.data.features).to.be.an('array')
        expect(product1.data.features).to.have.all.members([
            'O MacBook Pro de 13 polegadas está voando com o chip M1 da Apple',
            'CPU de oito núcleos encara com rapidez fluxos de trabalho complexos em fotografia, programação, edição de vídeo e muito mais. A GPU de oito núcleos da conta de tarefas com gráficos pesados e roda muito melhor os jogos.',
            'O Neural Engine de 16 núcleos aumenta o poder do aprendizado de máquina dos seus apps favoritos.'
        ]);
        expect(product2.data.features).to.be.an('array')
        expect(product2.data.features).to.have.all.members(['Cuida da saúde de toda a boca, combatendo bactérias nos dentes, língua, bochechas e gengiva!',
        'Também te ajuda a prevenir cáries e cavidades causadas pelo açúcar e ácido dos alimentos.',
        'Com o uso contínuo, fortalece o esmalte dos dentes, protegendo ainda mais contra possíveis danos!',
        'Além de neutralizar instantaneamente os odores que causam o mau hálito* , aumenta o frescor e combate ativamente as bactérias, que são a primeira causa desse problema.(* com base em estudos in vitro)',
        'Possui sistema inteligente para reduzir a placa bacteriana de forma contínua e auxilia no alívio de sensibilidade.','Contém CPC: Estudos de laboratório conduzidos pela Colgate demonstram que os cremes dentais que contém zinco e os enxaguantes bucais que contém CPC neutralizam em 99.9% o vírus.'
        ]);
    });
    
});

describe('Should handle invalid vips', () => {

    let file = fs.readFileSync('./test_sources/NOT_FOUND_VIP.html', 'utf8');
    let amzScrapper = new AmzScrapper();

    it('should throw error if cant parse title or price', () => {
        assert.throws(function() {amzScrapper.parseProductDetails('XXXXXXXX', file)}, Error, 'Error parsing product item page');
    });

});
