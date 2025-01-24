export const vocabularyType = `
    type Vocabulary {
        _id: ID
        language: String
        memorized: [String]
        name: String
        userId: String
        wordId: [String]
    }

    input VocabularyInput {
        _id: ID
        language: String
        name: String
        userId: String
    }
`;

export const types = `
    ${vocabularyType}
`;

export const query = `
    getVocaList(input: VocabularyInput, offset: Int, limit: Int): [Vocabulary]
`;

export const mutation = `
`;
