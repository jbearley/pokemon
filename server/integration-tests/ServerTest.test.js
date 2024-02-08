const { Pool } = require(`pg`);
require(`dotenv`).config();

describe(`testing postgres`, () => {
    let pgPool;
    let client;

    beforeAll(() => {
        pgPool = new Pool({
            connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
        });
    });

    afterAll(async () => {
        await pgPool.end();
    });

    beforeEach(async () => {
        client = await pgPool.connect();
        await client.query(`BEGIN`);
    });

    afterEach(async () => {
        await client.query(`ROLLBACK`);
        client.release();
    });

    // it(`should test`, async () => {
    //     throw new Error(`This needs to be implemented with your new db table`);
    // });

    it(`should establish connection`, async () => {
        const client = await pgPool.connect();
        try {
            await client.query(`BEGIN`);

            const { rows } = await client.query(`SELECT 1 AS "result"`);
            expect(rows[0].result).toBe(1);

            await client.query(`ROLLBACK`);
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            client.release();
        }
    });
});
