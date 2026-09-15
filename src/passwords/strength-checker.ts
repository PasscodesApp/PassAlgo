import { clamp } from "../mathf";

type PasswordStrength = {
    score: number;
    label: "Weak" | "Medium" | "Strong";
};

export function getPasswordStrength(password: string): PasswordStrength {
    if (password.length === 0) {
        return {
            score: 0,
            label: "Weak",
        };
    }

    let score = 0;

    /*
     * Length
     *
     * Longer passwords get progressively more credit,
     * with diminishing returns.
     */
    if (password.length >= 8) {
        score += 0.2;
    }

    if (password.length >= 12) {
        score += 0.15;
    }

    if (password.length >= 16) {
        score += 0.15;
    }

    if (password.length >= 20) {
        score += 0.1;
    }

    /*
     * Character diversity.
     */
    if (/[a-z]/.test(password)) {
        score += 0.1;
    }

    if (/[A-Z]/.test(password)) {
        score += 0.1;
    }

    if (/[0-9]/.test(password)) {
        score += 0.1;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score += 0.1;
    }

    /*
     * Penalize passwords made almost entirely from
     * the same repeated character.
     */
    const uniqueCharacters = new Set(password).size;
    const uniquenessRatio = uniqueCharacters / password.length;

    if (uniquenessRatio < 0.25) {
        score -= 0.2;
    } else if (uniquenessRatio < 0.4) {
        score -= 0.1;
    }

    score = clamp(score, 0, 1);

    /*
     * Keep the public score stable and predictable.
     */
    score = Number(score.toFixed(2));

    let label: PasswordStrength["label"];

    if (score < 0.4) {
        label = "Weak";
    } else if (score < 0.7) {
        label = "Medium";
    } else {
        label = "Strong";
    }

    return {
        score,
        label,
    };
}
