/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Db1773280737344 {
    name = 'Db1773280737344'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id_usuario\` int NOT NULL AUTO_INCREMENT, \`tipo_usuario\` enum ('Admin', 'Aluno', 'Responsavel Legal', 'Funcionario') NOT NULL DEFAULT 'Aluno', \`dentro_da_escola\` tinyint NOT NULL DEFAULT 0, \`nome\` varchar(255) NOT NULL, \`data_nasc\` date NOT NULL, \`cpf\` varchar(11) NOT NULL, \`rg\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`sexo\` enum ('H', 'M') NOT NULL, \`cep\` varchar(15) NOT NULL, \`numero_casa\` varchar(10) NOT NULL, \`complemento\` varchar(255) NOT NULL, PRIMARY KEY (\`id_usuario\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`aluno\` (\`id_aluno\` int NOT NULL, \`serie\` int NOT NULL, \`turma\` char(1) NOT NULL, \`modalidade_ensino\` varchar(255) NOT NULL, \`turno\` enum ('Manhã', 'Tarde', 'Noite') NOT NULL, \`necessidades_especiais\` tinyint NOT NULL DEFAULT 0, \`necessidades_desc\` text NULL, PRIMARY KEY (\`id_aluno\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sala\` (\`id_sala\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`tipo\` varchar(255) NOT NULL, \`andar\` int NOT NULL, \`capacidade\` int NOT NULL, \`equipamentos\` text NOT NULL, \`tem_ar\` tinyint NOT NULL DEFAULT 0, \`tem_computador\` tinyint NOT NULL DEFAULT 0, \`tem_acessibilidade\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id_sala\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`funcionario\` (\`id_funcionario\` int NOT NULL, \`cargo\` varchar(255) NOT NULL, \`setor\` varchar(255) NOT NULL, \`contrato\` varchar(255) NOT NULL, \`registro\` varchar(255) NOT NULL, \`data_admissao\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id_funcionario\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`anotacoes\` (\`anotacao_id\` int NOT NULL AUTO_INCREMENT, \`id_usuario\` int NOT NULL, \`titulo\` varchar(255) NOT NULL DEFAULT 'Nota Sem Título', \`conteudo\` text NOT NULL, \`cor\` char(7) NOT NULL DEFAULT '#808080', PRIMARY KEY (\`anotacao_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`aluno\` ADD CONSTRAINT \`FK_8a2d97bc538f6b5804aad14ebda\` FOREIGN KEY (\`id_aluno\`) REFERENCES \`usuario\`(\`id_usuario\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`funcionario\` ADD CONSTRAINT \`FK_9c49418b71ed3edad5f4a9a70b2\` FOREIGN KEY (\`id_funcionario\`) REFERENCES \`usuario\`(\`id_usuario\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`anotacoes\` ADD CONSTRAINT \`FK_056ac6e6fd958aae80a3bcf7a1a\` FOREIGN KEY (\`id_usuario\`) REFERENCES \`usuario\`(\`id_usuario\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`anotacoes\` DROP FOREIGN KEY \`FK_056ac6e6fd958aae80a3bcf7a1a\``);
        await queryRunner.query(`ALTER TABLE \`funcionario\` DROP FOREIGN KEY \`FK_9c49418b71ed3edad5f4a9a70b2\``);
        await queryRunner.query(`ALTER TABLE \`aluno\` DROP FOREIGN KEY \`FK_8a2d97bc538f6b5804aad14ebda\``);
        await queryRunner.query(`DROP TABLE \`anotacoes\``);
        await queryRunner.query(`DROP TABLE \`funcionario\``);
        await queryRunner.query(`DROP TABLE \`sala\``);
        await queryRunner.query(`DROP TABLE \`aluno\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
    }
}
