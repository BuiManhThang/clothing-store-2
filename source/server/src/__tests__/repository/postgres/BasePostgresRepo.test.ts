import { BaseEntity } from '../../../domain/entities/BaseEntity'
import { BasePostgresRepo } from '../../../infrastructure/repositories/BasePostgresRepo'
import { Condition, FilterDataType, Operator } from '../../../shared/enums/paginationEnum'
import { FilterObject } from '../../../shared/types/paginationType'

describe('BasePostgresRepo', () => {
  let basePostgresRepo: BasePostgresRepo<BaseEntity>

  beforeEach(() => {
    basePostgresRepo = new BasePostgresRepo('test')
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  const testCases: {
    input: FilterObject<BaseEntity>[]
    expectedOutput: string
    expectedValues: any[]
  }[] = [
    {
      input: [
        {
          column: 'id',
          dataType: FilterDataType.String,
          operator: Operator.Equals,
          value: '123456',
        },
      ],
      expectedOutput: '"id" = $1',
      expectedValues: ['123456'],
    },
    {
      input: [
        {
          column: 'id',
          dataType: FilterDataType.String,
          operator: Operator.Equals,
          value: '123456',
          condition: Condition.And,
        },
        {
          column: 'createdBy',
          dataType: FilterDataType.String,
          operator: Operator.Contains,
          value: 'bmthang',
        },
      ],
      expectedOutput: '"id" = $1 and "createdBy" LIKE $2',
      expectedValues: ['123456', '%bmthang%'],
    },
    {
      input: [
        {
          filterObjects: [
            {
              column: 'id',
              dataType: FilterDataType.String,
              operator: Operator.Equals,
              value: '123456',
              condition: Condition.Or,
            },
            {
              column: 'createdBy',
              dataType: FilterDataType.String,
              operator: Operator.Contains,
              value: 'bmthang',
            },
          ],
          condition: Condition.And,
        },
        {
          column: 'createdAt',
          dataType: FilterDataType.Number,
          operator: Operator.Less,
          value: 18,
        },
      ],
      expectedOutput: '("id" = $1 or "createdBy" LIKE $2) and "createdAt" < $3',
      expectedValues: ['123456', '%bmthang%', 18],
    },
  ]

  test.each(
    testCases.map((testCase) => [testCase.input, testCase.expectedOutput, testCase.expectedValues])
  )(
    'should return %s for input %s',
    (input: FilterObject<BaseEntity>[], expectedOutput: string, expectedValues: any[]) => {
      const values: any[] = []
      const result = basePostgresRepo._getWhere(input, values)
      expect(result).toEqual(expectedOutput)
      expect(values).toEqual(expectedValues)
    }
  )
})
