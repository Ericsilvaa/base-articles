import _ from 'lodash'
import BaseRepository from './baseRepository'
import {
  AnyRecord,
  ModelStructure,
  ModelTypes,
  ModelScalarFields,
  MODELS_NAME,
} from './prisma-repo'

// This type will be used if you want to extends the functions in Categories Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.CATEGORIES]['Where']
type Select = ModelTypes[typeof MODELS_NAME.CATEGORIES]['Select']
type Include = ModelTypes[typeof MODELS_NAME.CATEGORIES]['Include']
type Create = ModelTypes[typeof MODELS_NAME.CATEGORIES]['Create']
type Update = ModelTypes[typeof MODELS_NAME.CATEGORIES]['Update']
type Cursor = ModelTypes[typeof MODELS_NAME.CATEGORIES]['Cursor']
type Order = ModelTypes[typeof MODELS_NAME.CATEGORIES]['Order']
type Delegate = ModelTypes[typeof MODELS_NAME.CATEGORIES]['Delegate']
type GroupBy = ModelTypes[typeof MODELS_NAME.CATEGORIES]['GroupBy']
type Scalar = ModelScalarFields<typeof MODELS_NAME.CATEGORIES>
type Model = ModelStructure[typeof MODELS_NAME.CATEGORIES]
/*  eslint-enable @typescript-eslint/no-unused-vars */

class Categories extends BaseRepository(MODELS_NAME.CATEGORIES) { }

export default Categories
