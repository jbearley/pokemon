const usersService = require(`./users-service`);
const usersRepository = require(`../repositories/users-repository`);

// Create usernames and passwords to test so we don't need to type it out every time
const goodUser = `Ordo`;
const goodPass = `Besany`;
const tooLong = `01234567890123456789
                 01234567890123456789
                 01234567890123456789
                 01234567890123456789
                 01234567890123456789
                 01234567890123456789`;
const notAString = 23;

describe(`users service`, () => {
    describe(`getById`, () => {
        test(`throw if negative`, () => {
            expect(() => usersService.getById(-1)).toThrow(`Id must be greater than 0`);
        });
    });
    describe(`create`, () => {
        it(`throw if password is not a string`, async () => {
            await expect(usersService.create(goodUser, notAString))
                .rejects
                .toThrow(`Not a valid user`);
        });
        it(`throw if password is too long`, async () => {
            await expect(usersService.create(goodUser, tooLong))
                .rejects
                .toThrow(`Not a valid user`);
        });
        it(`throw if username is not a string`, async () => {
            await expect(usersService.create(notAString, goodPass))
                .rejects
                .toThrow(`Not a valid user`);
        });
        it(`throw if username is too long`, async () => {
            await expect(usersService.create(tooLong, goodPass))
                .rejects
                .toThrow(`Not a valid user`);
        });
    });
    describe(`getByUsername`, () => {
        it(`throw if username is too long`, async () => {
            await expect(usersService.getByUsername(tooLong))
                .rejects
                .toThrow(`Username not valid`);
        });
        it(`throw if username is not a string`, async () => {
            await expect(usersService.getByUsername(notAString))
                .rejects
                .toThrow(`Username not valid`);
        });
        it(`throw if username is not in the database`, async () => {
            await expect(usersService.getByUsername(`Fred`))
                .rejects
                .toThrow(`Username not recognized`);
        });
    });
    describe(`updatePokemon`, () => {
        it(`throw if pokemonNum is not a number`, async () => {
            await expect(usersService.updatePokemon(`username`, `pasword`, goodUser, `Charmander`))
                .rejects
                .toThrow(`pokemonNum is not valid`);
        });
        it(`throw if pokemonNum is not within the bounds`, async () => {
            await expect(usersService.updatePokemon(`username`, `pasword`, -2, `Charmander`))
                .rejects
                .toThrow(`pokemonNum is not valid`);
        });
    });
    describe(`deletePokemon`, () => {
        it(`throw if pokemonNum is not a number`, async () => {
            await expect(usersService.deletePokemon(`username`, `pasword`, goodUser))
                .rejects
                .toThrow(`pokemonNum is not valid`);
        });
        it(`throw if pokemonNum is not within the bounds`, async () => {
            await expect(usersService.deletePokemon(`username`, `pasword`, 32))
                .rejects
                .toThrow(`pokemonNum is not valid`);
        });
        
    });
});
