export type PasswordGeneratorOptions = {
    length: number;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
};

const CHARACTER_SETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{};:,.<>?",
} as const;

export type CharacterType = keyof typeof CHARACTER_SETS;

export type RandomSource = {
    randomInt(max: number): number;
};

export function generatePassword(
    options: PasswordGeneratorOptions,
    random: RandomSource,
): string {
    if (options.length < 1) {
        throw new RangeError("Password length must be a positive integer.");
    }

    const characters = getCharacterPool(options);

    if (characters.length === 0) {
        throw new Error("At least one character type must be selected.");
    }

    let password = "";

    for (let i = 0; i < options.length; i++) {
        const index = random.randomInt(characters.length);
        password += characters[index];
    }

    return password;
}

function getCharacterPool(options: PasswordGeneratorOptions): string {
    let characters = "";

    if (options.uppercase) {
        characters += CHARACTER_SETS.uppercase;
    }

    if (options.lowercase) {
        characters += CHARACTER_SETS.lowercase;
    }

    if (options.numbers) {
        characters += CHARACTER_SETS.numbers;
    }

    if (options.symbols) {
        characters += CHARACTER_SETS.symbols;
    }

    return characters;
}
