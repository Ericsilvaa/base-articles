import _ from 'lodash'
import BaseRepository from './baseRepository'
import {
  AnyRecord,
  ModelStructure,
  ModelTypes,
  ModelScalarFields,
  MODELS_NAME,
} from './prisma-repo.ts'

// This type will be used if you want to extends the functions in Articles Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.ARTICLES]['Where']
type Select = ModelTypes[typeof MODELS_NAME.ARTICLES]['Select']
type Include = ModelTypes[typeof MODELS_NAME.ARTICLES]['Include']
type Create = ModelTypes[typeof MODELS_NAME.ARTICLES]['Create']
type Update = ModelTypes[typeof MODELS_NAME.ARTICLES]['Update']
type Cursor = ModelTypes[typeof MODELS_NAME.ARTICLES]['Cursor']
type Order = ModelTypes[typeof MODELS_NAME.ARTICLES]['Order']
type Delegate = ModelTypes[typeof MODELS_NAME.ARTICLES]['Delegate']
type GroupBy = ModelTypes[typeof MODELS_NAME.ARTICLES]['GroupBy']
type Scalar = ModelScalarFields<typeof MODELS_NAME.ARTICLES>
type Model = ModelStructure[typeof MODELS_NAME.ARTICLES]
/*  eslint-enable @typescript-eslint/no-unused-vars */

class Articles extends BaseRepository(MODELS_NAME.ARTICLES) { }

export default Articles
