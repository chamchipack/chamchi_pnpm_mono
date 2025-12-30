// models/word.ts
import { Schema, model, models, InferSchemaType, Model } from 'mongoose';

/** ========= Enums ========= */
export const PartOfSpeech = ['verb', 'adj', 'noun', 'adv'] as const;
export type PartOfSpeech = (typeof PartOfSpeech)[number];

export const JLPTLevels = ['N1', 'N2', 'N3', 'N4', 'N5'] as const;
export type JLPT = (typeof JLPTLevels)[number];

export const EndingRo = [
  'u',
  'ku',
  'gu',
  'su',
  'mu',
  'nu',
  'bu',
  'tsu',
  'ru',
  'suru',
] as const;
export type EndingRo = (typeof EndingRo)[number];

/** ========= Subdocs ========= */
const TokenSchema = new Schema(
  {
    jp: { type: String, required: true },
    reading: { type: String },
  },
  { _id: false },
);

const ExampleSchema = new Schema(
  {
    jp: { type: String, required: true },
    tokens: { type: [TokenSchema], required: true, default: [] },
    ko: { type: String, required: true },
    ro: { type: String },
  },
  { _id: false },
);

const SenseSchema = new Schema(
  {
    meaning: { type: String, required: true },
    notes: { type: String, required: true },
    tags: { type: [String], default: undefined }, // string[] | undefined
  },
  { _id: false },
);

/** ========= Base Word (discriminator key: type) ========= */
const BaseWordSchema = new Schema(
  {
    language: { type: String, required: true, enum: ['japanese'] },
    jp: { type: String, required: true },
    kana: { type: String, required: true },
    ro: { type: String, required: true },
    type: { type: String, required: true, enum: PartOfSpeech, index: true },
    jlpt: { type: String, required: true, enum: JLPTLevels, index: true },
    exception: { type: Boolean, default: undefined },
    senses: { type: [SenseSchema], default: undefined },
    examples: { type: [ExampleSchema], default: undefined },
  },
  {
    timestamps: true,
    discriminatorKey: 'type', // <- 중요 (verb/adj/noun에 따라 분기)
  },
);

/** ========= Verb ========= */
const VerbMetaSchema = new Schema(
  {
    form: { type: Number, enum: [1, 2, 3], required: true }, // 오단/1단/불규칙
    stem: {
      jp: { type: String, required: true },
      ro: { type: String, required: true },
    },
    ending: {
      jp: { type: String, required: true },
      ro: { type: String, required: true, enum: EndingRo },
    },
  },
  { _id: false },
);

const VerbWordSchema = new Schema(
  {
    meta: { type: VerbMetaSchema, required: true },
  },
  { _id: false },
);

/** ========= Adjective ========= */
const AdjMetaSchema = new Schema(
  {
    form: { type: String, enum: ['i', 'na'], required: true }, // い / な
    stem: {
      jp: { type: String, required: true },
      ro: { type: String, required: true },
    },
    ending: {
      jp: { type: String, required: true },
      ro: { type: String, required: true },
    },
  },
  { _id: false },
);

const AdjWordSchema = new Schema(
  {
    meta: { type: AdjMetaSchema, required: true },
  },
  { _id: false },
);

/** ========= Noun ========= */
const NounMetaSchema = new Schema(
  {
    isVerbAvailable: { type: Boolean, required: true }, // サ変가능 등 비슷한 플래그
    stem: {
      jp: { type: String, required: true },
      ro: { type: String, required: true },
    },
    ending: {
      jp: { type: String, required: true },
      ro: { type: String, required: true, enum: EndingRo },
    },
  },
  { _id: false },
);

const NounWordSchema = new Schema(
  {
    meta: { type: NounMetaSchema, required: true },
  },
  { _id: false },
);

/** ========= Models & Discriminators ========= */
export const Word = models.Word || model('Word', BaseWordSchema, 'Word'); // base model

export const VerbWord =
  (Word.discriminators?.verb as Model<any>) ||
  Word.discriminator('verb', VerbWordSchema);

export const AdjWord =
  (Word.discriminators?.adj as Model<any>) ||
  Word.discriminator('adj', AdjWordSchema);

export const NounWord =
  (Word.discriminators?.noun as Model<any>) ||
  Word.discriminator('noun', NounWordSchema);

/** ========= TS inference (선택) ========= */
export type WordDoc = InferSchemaType<typeof BaseWordSchema> & {
  // discriminator에 따라 meta 존재 형태가 달라짐
  meta?: any;
};
export type VerbWordDoc = InferSchemaType<typeof BaseWordSchema> &
  InferSchemaType<typeof VerbWordSchema>;
export type AdjWordDoc = InferSchemaType<typeof BaseWordSchema> &
  InferSchemaType<typeof AdjWordSchema>;
export type NounWordDoc = InferSchemaType<typeof BaseWordSchema> &
  InferSchemaType<typeof NounWordSchema>;
