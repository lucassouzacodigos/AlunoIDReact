create database ALUNOIDBD;
drop database ALUNOIDBD;
use ALUNOIDBD;
show tables;

desc entrada_saida;
desc usuario;
desc anotacoes;
desc notificacoes;
desc sala;

truncate usuario;
truncate aluno;
truncate anotacoes;
truncate notificacoes;
truncate sala;


select * from sala;
select * from usuario;
select * from aluno;
select * from funcionario;


DELETE FROM usuario where id_usuario = 251;



SELECT 
    u.*,
    a.*
FROM usuario u
LEFT JOIN aluno a
    ON a.id_aluno = u.id_usuario;
    



update usuario set email = "a", senha = "A" where id_usuario = 1;
update usuario set email = "b", senha = "B" where id_usuario = 2;
update usuario set tipo_usuario = "Admin" where id_usuario = 2;


INSERT INTO usuario(tipo_usuario, nome, email, senha) VALUES('aluno','Lucas Tadashi da Silva','lucas@email.com','123');
INSERT INTO usuario(tipo_usuario, nome, email, senha, cpf) VALUES('aluno','Alessfa NFSU2','alesfaa@email.com','123', "123");

create table usuario(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    tipo_usuario ENUM ('Aluno','Funcionario','Responsavel Legal') DEFAULT 'Aluno',
	nome VARCHAR(255),
    data_nasc DATE,
    cpf VARCHAR(255),
    rg VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255),
    sexo ENUM('H', 'M'),
    cep VARCHAR(255),
    numero_casa VARCHAR(255),
    complemento VARCHAR(255)
);

create table aluno(
	id_aluno INT PRIMARY KEY,
	serie INT,
    turma CHAR(1),
    modalidade_ensino VARCHAR(255),
    turno ENUM('Manhã','Tarde','Noite'),
    necessidades_especiais BOOLEAN DEFAULT FALSE,
    necessidades_desc TEXT,
    
    FOREIGN KEY (id_aluno) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

create table funcionario(
	id_funcionario INT PRIMARY KEY,
	ocupacao VARCHAR(255),
    setor VARCHAR(255),	
    tipo_contrato VARCHAR(255),
    numero_registro VARCHAR(255),
    data_de_admissao DATE,
    
    FOREIGN KEY (id_funcionario) REFERENCES usuario(id_usuario)
);

CREATE TABLE responsavel_legal(
	id_responsavel_legal INT PRIMARY KEY,
	dependente INT,
    
    FOREIGN KEY (id_responsavel_legal) REFERENCES usuario(id_usuario),
    FOREIGN KEY (dependente) REFERENCES aluno(id_aluno)
);



select * from sala;
INSERT INTO sala(nome) VALUES("Sala 01");

create table sala(
	id_sala INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(255),
    tipo VARCHAR(255),
    andar INT,
    capacidade INT,
    equipamentos TEXT,
    tem_ar_condicionado BOOLEAN DEFAULT FALSE,
    tem_computador BOOLEAN DEFAULT FALSE,
    tem_acessibilidade BOOLEAN DEFAULT FALSE
);


drop table sala;
INSERT INTO sala (nome, tipo, andar, capacidade, equipamentos) VALUES('sala 02','sala de aula','2','30','COMPUTADOR LOUSA TELEVISAO');
SELECT * FROM sala;



################################
drop table usuario;
select * from usuario;
INSERT INTO usuario (nome, cpf, email, cep, numero_casa, senha, usuario_ativo, em_aula) VALUES ('João Silva', '12345678901', 'joao@email.com', '12345-678', '12A', 'senha123', TRUE, FALSE);
INSERT INTO usuario (nome, cpf, email, cep, numero_casa, senha, usuario_ativo, em_aula, carteirinhaHash) VALUES ('Lucas Tadashi', '123456278901', 'lucas@email.com', '22345-678', '12A', '123', TRUE, FALSE, "aef9afjio");
################################


create table entrada_saida(
	id_usuario INT,
    data_atual DATE DEFAULT NULL,
    hora_entrada TIME DEFAULT NULL,
    hora_saida TIME DEFAULT NULL,

    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);


################################
insert into entrada_saida(id_usuario) values(0);
select * from entrada_saida;
drop table entrada_saida;
################################


create table notas(
	
);

create table anotacoes(
	id_usuario INT,
    anotacao_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titulo_anotacao VARCHAR(255) DEFAULT 'Nota Sem Título',
    conteudo_anotacao TEXT,
    cor CHAR(7) DEFAULT('#808080'),
    
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

################################
select * from anotacoes;
INSERT INTO anotacoes (id_usuario, conteudo_anotacao) VALUES (0, 'Esta é a minha primeira anotação.');
drop table anotacoes;
################################


create table notificacoes(
	id_notificacao INT PRIMARY KEY AUTO_INCREMENT,
    data_criado DATE DEFAULT NULL,
    icone_img VARCHAR(255),
    titulo VARCHAR(255),
    conteudo_notificacao VARCHAR(255)
    
);

################################
select * from notificacoes;

drop table notificacoes;
################################




drop table usuario;
select * from usuario;

