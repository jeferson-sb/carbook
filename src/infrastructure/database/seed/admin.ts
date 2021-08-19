import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');
  const id = uuid();
  const pwd = await hash('admin', 8);
  await connection.query(
    `
    INSERT INTO users(id, name, email, password, is_admin, created_at, driver_license)
    values('${id}', 'admin', 'admin@carbook.com', '${pwd}', true, 'now()', 'XXXXXX')
    `,
  );

  await connection.close();
}

create().then(() => console.log('User admin created'));
