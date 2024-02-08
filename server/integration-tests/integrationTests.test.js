require(`dotenv`).config();
const usersRepository = require(`../src/repositories/users-repository`);
const usersService = require(`../src/services/users-service`);
describe(`users database`, () => {
    const createdUserIds = [];
    // Note: NORMALLY you would probably use a different database so that you aren't creating fake records in your real database. If something goes wrong with testing, you could cause a problem for real users! That said, I've set it up this way for simplicity-sake. We do clean up test data in the "afterAll" to say "after all these tests are done, remove the test data I created".

    afterAll(async () => {
        await usersRepository.deleteAll(createdUserIds);
        await usersRepository.pool.end();
    });

    it(`should get the seeded user by ID`, async () => {
        const rows = await usersRepository.getById(1);

        // Expect the seeded data have been seeded successfully
        expect(rows.length).toBe(1);
        expect(rows[0]).toStrictEqual({
            id: 1,
            username: `Kal-buir`,
            pasword: `ehn-kal`,
            pokemon1: `pikachu`,
            pokemon2: `mew`,
            pokemon3: `ditto`,
            pokemon4: `bonsly`,
            pokemon5: `flapple`,
            pokemon6: `meowth`,
        });
    });

    it(`should get the seeded user by Username`, async () => {
        const rows = await usersService.getByUsername(`Kal-buir`); 

        // Expect the seeded data have been seeded successfully
        expect(rows.length).toBe(1);
        expect(rows[0]).toStrictEqual({
            id: 1,
            username: `Kal-buir`,
            pasword: `ehn-kal`,
            pokemon1: `pikachu`,
            pokemon2: `mew`,
            pokemon3: `ditto`,
            pokemon4: `bonsly`,
            pokemon5: `flapple`,
            pokemon6: `meowth`,
        });
    });

    it(`should create a new user add a pokemon and then deleat it`, async () => {
        // To make this test even better, you could use some library to randomize author/title data
        const username = `Ordo`;
        const pasword  = `Besany`;

        const test = await usersService.create(username, pasword);
        expect(test.rowCount).toBe(1);
        const createdId = test.rows[0].id;
        createdUserIds.push(createdId);

        const createdUsers = await usersService.getById(createdId);
        expect(createdUsers.length).toBe(1);
        expect(createdUsers[0]).toStrictEqual({
            id: createdId,
            username: `Ordo`,
            pasword: `Besany`,
            pokemon1: null,
            pokemon2: null,
            pokemon3: null,
            pokemon4: null,
            pokemon5: null,
            pokemon6: null,
        });
        
        const test1 = await usersService.updatePokemon(username, pasword, 1, `bonsly`);

        const createdUsers1 = await usersService.getById(createdId);
        expect(createdUsers1.length).toBe(1);
        expect(createdUsers1[0]).toStrictEqual({
            id: createdId,
            username: `Ordo`,
            pasword: `Besany`,
            pokemon1: `bonsly`,
            pokemon2: null,
            pokemon3: null,
            pokemon4: null,
            pokemon5: null,
            pokemon6: null,
        });


        const test2 = await usersService.deletePokemon(username, pasword, 1);

        const createdUsers2 = await usersService.getById(createdId);
        expect(createdUsers2.length).toBe(1);
        expect(createdUsers2[0]).toStrictEqual({
            id: createdId,
            username: `Ordo`,
            pasword: `Besany`,
            pokemon1: null,
            pokemon2: null,
            pokemon3: null,
            pokemon4: null,
            pokemon5: null,
            pokemon6: null,
        });


    });
    it(`should throw an error if the password is invalid`, async () => {
        const username = `Ordo`;
        const pasword = `01234567890123456789
                 01234567890123456789
                 01234567890123456789
                 01234567890123456789
                 01234567890123456789
                 01234567890123456789`;
        
        await expect(usersService.create(username, pasword))
            .rejects
            .toThrow(`Not a valid user`);
    });

    it(`should return true for corect username`, async () => {
        const username = `Kal-buir`;
        const pasword = `ehn-kal`;
        
        await expect(usersService.checkPasword(username, pasword)).resolves.toBe(true);
    });

    it(`should throw an error if the username dose not exist`, async () => {
        const username = `sldkfjlsdkfjsldkfjsldkfjls`;
        const pasword = `0123`;
        
        await expect(usersService.checkPasword(username, pasword))
            .rejects
            .toThrow(`Username not recognized`);
    });

});  