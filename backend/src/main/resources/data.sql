INSERT INTO project_board.`user`
    (id, username, password, active)
VALUES
    (1, 'srijan', '$2a$12$GYb5BKKUNsZAarF.2pCO5uTM91w8O.7/IC9IfLs0fake3alNZGkCW', 1);

INSERT INTO project_board.`authority`
    (id, authority, user_id)
VALUES
    (1, 'ROLE_USER', 1);
