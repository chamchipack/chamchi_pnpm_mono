export const vocabularyType = `
    type Vocabulary {
        _id: ID
        language: String
        memorized: [String]
        name: String
        userId: String
        wordId: [String]
    }
`;

export const vocabularyInputType = `
    input VocabularyInput {
        id: ID
        language: String
        name: String
        userId: String
    }
`;
